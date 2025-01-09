import { useEffect, useState } from "react";
import { SessionAccountInterface } from "@argent/tma-wallet";
import {
  uint256,
  RpcProvider,
  Account,
  Contract,
  AccountInterface,
} from "starknet";
import { initWallet } from "./components/contracts";
import VAULT from "./ABI/VAULT_ABI.json";
import ERC20 from "./ABI/ERC20_ABI.json";
import "./App.css";

const APPROVE_AMOUNT = BigInt(2000000000000000000n).toString(); // 2 STRK
const WITHDRAW_AMOUNT = uint256.bnToUint256(500000000000000000n); // 0.5 STRK
const VAULT_ADDRESS =
  "0x0023611dcff5bd0be494391d54c690c413e8fce631432c21cd629bbb62641e0e";
const STRK_ADDRESS =
  "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

const provider = new RpcProvider({
  nodeUrl: import.meta.env.VITE_RPC_URL,
});
const privateKey = import.meta.env.VITE_ADMIN_PRIVATE_KEY;
const accountAddress = import.meta.env.VITE_ADMIN_ADDRESS;

const ADMIN_ACCOUNT = new Account(provider, accountAddress, privateKey);
const STRK_TOKEN = new Contract(ERC20.abi, STRK_ADDRESS, provider);

const argentTMA = initWallet(VAULT_ADDRESS);

function App() {
  const [account, setAccount] = useState<SessionAccountInterface | undefined>();
  const [vaultContract, setVaultContract] = useState<Contract | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    async function connect() {
      try {
        const res = await argentTMA.connect();
        console.log("res", res);
        if (!res) return;

        setAccount(res.account);

        if (account?.getSessionStatus() !== "VALID") return;

        setVaultContract(
          new Contract(
            VAULT.abi,
            VAULT_ADDRESS,
            account as unknown as AccountInterface
          )
        );

        setIsConnected(true);
      } catch (err) {
        console.error("Failed to useEffect connect:", err);
      }
    }

    connect();
  }, []);

  const handleConnectButton = async () => {
    setIsLoading(true);
    try {
      await argentTMA.requestConnection({
        callbackData: "vault_connection",
        approvalRequests: [
          {
            tokenAddress: STRK_ADDRESS,
            amount: APPROVE_AMOUNT,
            spender: VAULT_ADDRESS,
          },
        ],
      });
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSessionButton = async () => {
    setIsLoading(true);
    try {
      await argentTMA.clearSession();
      setAccount(undefined);
      setIsConnected(false);
      setVaultContract(undefined);
    } catch (error) {
      console.error("Failed to clear session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleDeposit() {
    console.log("vaultContract", vaultContract?.address)
    console.log("account", account?.address)
    if (!vaultContract || !account) return;
    setIsLoading(true);
    try {
      await vaultContract.deposit();
    } catch (error) {
      console.error("Deposit transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleWithdraw() {
    setIsLoading(true);
    try {
      STRK_TOKEN.connect(ADMIN_ACCOUNT);
      console.log(`Invoke Tx - Transfer 1 tokens to erc20 contract...`);
      const sss3 = STRK_TOKEN.populate("transfer", {
        recipient: account?.address,
        amount: WITHDRAW_AMOUNT,
      });
      const { transaction_hash: transferTxHash } = await ADMIN_ACCOUNT.execute(
        sss3
      );
      console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
      await provider.waitForTransaction(transferTxHash);
    } catch (error) {
      console.error("Withdraw transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const shortAddress = (address: string | null | undefined): string => {
    return address ? `${address.slice(0, 6)}...${address.slice(-5)}` : "";
  };

  return (
    <>
      <div>
        <h2>TMA Game</h2>
        {!isConnected && <button onClick={handleConnectButton}>Connect</button>}

        {isConnected && (
          <div>
            <p>
              Account address: <code>{shortAddress(account?.address)}</code>
            </p>
            <button onClick={handleClearSessionButton}>Clear Session</button>
          </div>
        )}
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
        {isLoading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

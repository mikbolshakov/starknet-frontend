import { useEffect, useState } from "react";
import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { Contract, AccountInterface } from "starknet";
import { ethers } from "ethers";
import artifact from "./ABI/argent_contracts_Vault.contract_class.json";
import "./App.css";

const ABI = artifact.abi;
const vaultAddress =
  "0x049ecce809794c9bfbf880959989aa9d44cba35aebe1c6af360be09c7ad87ebd";

const argentTMA = ArgentTMA.init({
  environment: "sepolia", // "sepolia" | "mainnet"
  appName: import.meta.env.VITE_TELEGRAM_APP_NAME,
  appTelegramUrl: import.meta.env.VITE_TELEGRAM_APP_URL,
  sessionParams: {
    allowedMethods: [
      {
        contract: vaultAddress,
        selector: "deposit",
      },
    ],
    validityDays: 90,
  },
});

function App() {
  const [account, setAccount] = useState<SessionAccountInterface | undefined>();
  const [vaultContract, setVaultContract] = useState<Contract | undefined>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function connect() {
      try {
        const res = await argentTMA.connect();
        console.log("res", res);
        if (!res) return;

        const accountInstance = res.account;
        if (accountInstance.getSessionStatus() !== "VALID") return;

        const contractInstance = new Contract(
          ABI,
          vaultAddress,
          account as unknown as AccountInterface
        );

        setAccount(accountInstance);
        setVaultContract(contractInstance);
        setIsConnected(true);
      } catch (err) {
        console.error("My App: Failed to useEffect connect:", err);
      }
    }

    connect();
  }, []);

  const handleConnectButton = async () => {
    try {
      await argentTMA.requestConnection({
        callbackData: "custom_callback_data",
        approvalRequests: [
          {
            tokenAddress:
              "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d", // STRK
            amount: ethers.parseEther("100"),
            spender: vaultAddress,
          },
        ],
      });
      setIsConnected(true);
    } catch (error) {
      console.error("My App: Failed to connect:", error);
    }
  };

  const handleClearSessionButton = async () => {
    try {
      await argentTMA.clearSession();
      setAccount(undefined);
      setIsConnected(false);
    } catch (error) {
      console.error("My App: Failed to clear session:", error);
    }
  };

  async function handleDeposit() {
    if (!vaultContract || !isConnected || !account) return;

    setIsLoading(true);
    try {
      await vaultContract.deposit(ethers.parseEther("1.5"));
    } catch (error) {
      console.error("My App: Deposit transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div>
        <h2>My App TMA Game</h2>
        {!isConnected && <button onClick={handleConnectButton}>Connect</button>}

        {isConnected && (
          <div>
            <p>
              Account address: <code>{account?.address}</code>
            </p>
            <button onClick={handleClearSessionButton}>Clear Session</button>
            <button onClick={handleDeposit}>Deposit</button>
          </div>
        )}
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

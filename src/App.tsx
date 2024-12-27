import { useEffect, useState } from "react";
import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { Contract, AccountInterface, Call } from "starknet";
import { ethers } from "ethers";
import artifact from "./ABI/argent_contracts_Vault.contract_class.json";
import "./App.css";

const ABI = artifact.abi;

const argentTMA = ArgentTMA.init({
  environment: "sepolia", // "sepolia" | "mainnet"
  appName: import.meta.env.VITE_TELEGRAM_APP_NAME,
  appTelegramUrl: import.meta.env.VITE_TELEGRAM_APP_URL,
  sessionParams: {
    allowedMethods: [
      {
        contract:
          "0x049ecce809794c9bfbf880959989aa9d44cba35aebe1c6af360be09c7ad87ebd",
        selector: "deposit",
      },
    ],
    validityDays: 90,
  },
});

function App() {
  const [account, setAccount] = useState<SessionAccountInterface | undefined>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contract, setContract] = useState<Contract | undefined>();

  useEffect(() => {
    async function connect() {
      try {
        const res = await argentTMA.connect();
        if (!res) return;

        const accountInstance = res.account;
        if (accountInstance.getSessionStatus() !== "VALID") return;

        const contractInstance = new Contract(
          ABI,
          "0x049ecce809794c9bfbf880959989aa9d44cba35aebe1c6af360be09c7ad87ebd",
          account as unknown as AccountInterface
        );

        setAccount(accountInstance);
        setContract(contractInstance);
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    }

    connect();
  }, []);

  async function handleDeposit() {
    console.log("0");
    if (!contract || !isConnected || !account) return;
    setIsLoading(true);

    const call: Call = {
      contractAddress: contract.address,
      entrypoint: "deposit",
      calldata: [],
    };

    try {
        const fees = await account.estimateInvokeFee([call]);
        const tx = await contract["deposit"]({
          maxFee: fees?.suggestedMaxFee
            ? BigInt(fees.suggestedMaxFee) * 2n
            : undefined,
        });

        await argentTMA.provider.waitForTransaction(tx.transaction_hash);

      await contract.deposit(ethers.parseEther("1.5"));
    } catch (error) {
      console.error("Deposit transaction failed", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConnect() {
    try {
      await argentTMA.requestConnection("vault_connection");
      setIsConnected(true);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }

  const handleDisconnect = async () => {
    try {
      await argentTMA.clearSession();
      setAccount(undefined);
      setIsConnected(false);
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return (
    <div>
      <h2>TMA Game</h2>
      {!isConnected && <button onClick={handleConnect}>Connect</button>}
      {isConnected && (
        <div>
          <p>
            Account address: <code>{account?.address}</code>
          </p>
          <button onClick={handleDisconnect}>Clear Session</button>
          <button onClick={handleDeposit}>Deposit</button>
        </div>
      )}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default App;

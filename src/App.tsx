import { useEffect, useState } from "react";
import { SessionAccountInterface } from "@argent/tma-wallet";
import { Contract, AccountInterface } from "starknet";
import { ethers } from "ethers";
import artifact from "./ABI/argent_contracts_Vault.contract_class.json";
import "./App.css";
import { executeContractAction, initWallet } from "./components/contracts";

const ABI = artifact.abi;
const vaultAddress =
  "0x049ecce809794c9bfbf880959989aa9d44cba35aebe1c6af360be09c7ad87ebd";

const argentTMA = initWallet(vaultAddress);

let account: SessionAccountInterface | undefined;
let isConnected = false;
let contract: Contract | undefined;

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function connect() {
      try {
        const res = await argentTMA.connect();
        console.log("res", res);
        if (!res) return;

        account = res.account;
        if (account.getSessionStatus() !== "VALID") return;

        contract = new Contract(
          ABI,
          vaultAddress,
          account as unknown as AccountInterface
        );

        isConnected = true;
      } catch (err) {
        console.error("My App: Failed to useEffect connect:", err);
      }
    }

    connect();
  }, []);

  const handleConnectButton = async () => {
    try {
      await argentTMA.requestConnection({
        callbackData: "vault_connection",
        approvalRequests: [
          {
            tokenAddress:
              "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d", // STRK
            amount: ethers.parseEther("100"),
            spender: vaultAddress,
          },
        ],
      });
      isConnected = true;
    } catch (error) {
      console.error("My App: Failed to connect:", error);
    }
  };

  const handleClearSessionButton = async () => {
    try {
      await argentTMA.clearSession();
      account = undefined;
      isConnected = false;
      contract = undefined;
    } catch (error) {
      console.error("My App: Failed to clear session:", error);
    }
  };

  async function handleDeposit() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000000
      );
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

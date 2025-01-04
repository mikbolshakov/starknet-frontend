import { useEffect, useState } from "react";
import { SessionAccountInterface } from "@argent/tma-wallet";
import { Contract, AccountInterface } from "starknet";
import artifact from "./ABI/argent_contracts_Vault.contract_class.json";
import "./App.css";
import {
  executeContractAction_1,
  executeContractAction_14,
  executeContractAction_15,
  executeContractAction_2,
  executeContractAction_3,
  executeContractAction_4,
  executeContractAction_5,
  executeContractAction_6,
  executeContractAction_7,
  executeContractAction_8,
  executeContractAction_9,
  initWallet,
} from "./components/contracts";

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
    setIsLoading(true);
    try {
      await argentTMA.requestConnection({
        callbackData: "vault_connection",
        approvalRequests: [
          {
            tokenAddress:
              "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d", // STRK
            amount: 3000000000000,
            spender: vaultAddress,
          },
        ],
      });
      isConnected = true;
    } catch (error) {
      console.error("My App: Failed to connect:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSessionButton = async () => {
    setIsLoading(true);
    try {
      await argentTMA.clearSession();
      account = undefined;
      isConnected = false;
      contract = undefined;
    } catch (error) {
      console.error("My App: Failed to clear session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleDeposit_1() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_1(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_2() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_2(
        contract,
        account,
        argentTMA,
        "deposit",
        BigInt(1000000000000n).toString()
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_3() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_3(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000n
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_4() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_4(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_5() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_5(
        contract,
        account,
        argentTMA,
        "deposit",
        BigInt(1000000000000n).toString()
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_6() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_6(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000n
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_7() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_7(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_8() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_8(
        contract,
        account,
        argentTMA,
        "deposit",
        BigInt(1000000000000n).toString()
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_9() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_9(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000n
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_10() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_7(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_11() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_8(
        contract,
        account,
        argentTMA,
        "deposit",
        BigInt(1000000000000n).toString()
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_12() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_9(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000n
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_13() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await contract.deposit(1000000000000);
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_133() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await contract.deposit(1000000000000, 0);
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_134() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await contract.deposit("0xe8d4a51000", "0x0");
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_14() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_14(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeposit_15() {
    if (!contract || !account) return;
    setIsLoading(true);
    try {
      await executeContractAction_15(
        contract,
        account,
        argentTMA,
        "deposit",
        1000000000000
      );
    } catch (error) {
      console.error("My App: Deposit_ transaction failed:", error);
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
        <h2>My App TMA Game</h2>
        {!isConnected && <button onClick={handleConnectButton}>Connect</button>}

        {isConnected && (
          <div>
            <p>
              Account address: <code>{shortAddress(account?.address)}</code>
            </p>
            <button onClick={handleClearSessionButton}>Clear Session</button>
          </div>
        )}
        <button onClick={handleDeposit_1}>Deposit_1</button>
        <button onClick={handleDeposit_2}>Deposit_2</button>
        <button onClick={handleDeposit_3}>Deposit_3</button>
        <button onClick={handleDeposit_4}>Deposit_4</button>
        <button onClick={handleDeposit_5}>Deposit_5</button>
        <button onClick={handleDeposit_6}>Deposit_6</button>
        <button onClick={handleDeposit_7}>Deposit_7</button>
        <button onClick={handleDeposit_8}>Deposit_8</button>
        <button onClick={handleDeposit_9}>Deposit_9</button>
        <button onClick={handleDeposit_10}>Deposit_10</button>
        <button onClick={handleDeposit_11}>Deposit_11</button>
        <button onClick={handleDeposit_12}>Deposit_12</button>
        <button onClick={handleDeposit_13}>Deposit_13</button>
        <button onClick={handleDeposit_133}>Deposit_133</button>
        <button onClick={handleDeposit_134}>Deposit_134</button>
        <button onClick={handleDeposit_14}>Deposit_14</button>
        <button onClick={handleDeposit_15}>Deposit_15</button>
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

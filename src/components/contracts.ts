import { ArgentTMA, type SessionAccountInterface } from "@argent/tma-wallet";
import { uint256, type Call, type Contract } from "starknet";

export const initWallet = (contractAddress: string) =>
  ArgentTMA.init({
    environment: "sepolia",
    appName: import.meta.env.VITE_TELEGRAM_APP_NAME,
    appTelegramUrl: import.meta.env.VITE_TELEGRAM_APP_URL,
    sessionParams: {
      allowedMethods: [
        {
          contract: contractAddress,
          selector: "deposit",
        },
      ],
      validityDays: 90,
    },
  });

export async function executeContractAction_1(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  const u256Amount = uint256.bnToUint256(amount);

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_2(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: string
) {
  const u256Amount = uint256.bnToUint256(amount);

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_3(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: bigint
) {
  const u256Amount = uint256.bnToUint256(amount);

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_4(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  const u256Amount = uint256.bnToUint256(amount);

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low.toString(), u256Amount.high.toString()],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_5(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: string
) {
  const u256Amount = uint256.bnToUint256(amount);

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low.toString(), u256Amount.high.toString()],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_6(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: bigint
) {
  const u256Amount = uint256.bnToUint256(amount);

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low.toString(), u256Amount.high.toString()],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_7(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  const u256Amount = uint256.bnToUint256(BigInt(amount));

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low, u256Amount.high],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_8(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: string
) {
  const u256Amount = uint256.bnToUint256(BigInt(amount));

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low, u256Amount.high],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_9(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: bigint
) {
  const u256Amount = uint256.bnToUint256(BigInt(amount));

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low, u256Amount.high],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_10(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  const u256Amount = {
    low: BigInt(amount).toString(16),
    high: "0x0",
  };

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low, u256Amount.high],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_11(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: string
) {
  const u256Amount = {
    low: BigInt(amount).toString(16),
    high: "0x0",
  };

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low, u256Amount.high],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_12(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: bigint
) {
  const u256Amount = {
    low: BigInt(amount).toString(16),
    high: "0x0",
  };

  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [u256Amount.low, u256Amount.high],
  };

  try {
    const fees = await account?.estimateInvokeFee([call]);
    const tx = await contract[action]({
      maxFee: fees?.suggestedMaxFee
        ? BigInt(fees.suggestedMaxFee) * 2n
        : undefined,
    });
    await argentTMA.provider.waitForTransaction(tx.transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

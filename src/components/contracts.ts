import { ArgentTMA, type SessionAccountInterface } from "@argent/tma-wallet";
import { num, RPC, uint256, type Call, type Contract } from "starknet";

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

export async function executeContractAction_0(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string
) {
  try {
    const myCall = contract.populate(action, [1000000000000]);

    // const maxQtyGasAuthorized = 1800n;
    // const maxPriceAuthorizeForOneGas = 20n * 10n ** 12n;

    const estimatedFee1 = await account.estimateInvokeFee([myCall], {
      version: 3,
    });

    const resourceBounds = {
      //   l1_gas: {
      //     max_amount: num.toHex(maxQtyGasAuthorized),
      //     max_price_per_unit: num.toHex(maxPriceAuthorizeForOneGas),
      //   },
      //   l2_gas: {
      //     max_amount: num.toHex(0),
      //     max_price_per_unit: num.toHex(0),
      //   },
      ...estimatedFee1.resourceBounds,
      l1_gas: {
        ...estimatedFee1.resourceBounds.l1_gas,
        max_amount: num.toHex(
          BigInt(
            parseInt(estimatedFee1.resourceBounds.l1_gas.max_amount, 16) * 2
          ) // Double the estimated amount
        ),
      },
    };

    const { transaction_hash } = await account.execute(myCall, {
      version: 3,
      maxFee: estimatedFee1.suggestedMaxFee, // 10n ** 15n,
      feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1, // argentTMA.provider.RPC.EDataAvailabilityMode.L1,
      resourceBounds: resourceBounds,
    });

    await argentTMA.provider.waitForTransaction(transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_01(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string
) {
  try {
    const myCall = contract.populate(action, [
      BigInt(1000000000000n).toString(),
    ]);

    // const maxQtyGasAuthorized = 1800n;
    // const maxPriceAuthorizeForOneGas = 20n * 10n ** 12n;

    const estimatedFee1 = await account.estimateInvokeFee([myCall], {
      version: 3,
    });

    const resourceBounds = {
      //   l1_gas: {
      //     max_amount: num.toHex(maxQtyGasAuthorized),
      //     max_price_per_unit: num.toHex(maxPriceAuthorizeForOneGas),
      //   },
      //   l2_gas: {
      //     max_amount: num.toHex(0),
      //     max_price_per_unit: num.toHex(0),
      //   },
      ...estimatedFee1.resourceBounds,
      l1_gas: {
        ...estimatedFee1.resourceBounds.l1_gas,
        max_amount: num.toHex(
          BigInt(
            parseInt(estimatedFee1.resourceBounds.l1_gas.max_amount, 16) * 2
          ) // Double the estimated amount
        ),
      },
    };

    const { transaction_hash } = await account.execute(myCall, {
      version: 3,
      maxFee: estimatedFee1.suggestedMaxFee, // 10n ** 15n,
      feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1, // argentTMA.provider.RPC.EDataAvailabilityMode.L1,
      resourceBounds: resourceBounds,
    });

    await argentTMA.provider.waitForTransaction(transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_02(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  try {
    const decimalToHex = (decimal: number | bigint): string => {
      const bigDecimal = BigInt(decimal);
      return `0x${bigDecimal.toString(16)}`;
    };

    const hex = decimalToHex(amount);

    const myCall = contract.populate(action, [hex, "0x0"]);

    // const maxQtyGasAuthorized = 1800n;
    // const maxPriceAuthorizeForOneGas = 20n * 10n ** 12n;

    const estimatedFee1 = await account.estimateInvokeFee([myCall], {
      version: 3,
    });

    const resourceBounds = {
      //   l1_gas: {
      //     max_amount: num.toHex(maxQtyGasAuthorized),
      //     max_price_per_unit: num.toHex(maxPriceAuthorizeForOneGas),
      //   },
      //   l2_gas: {
      //     max_amount: num.toHex(0),
      //     max_price_per_unit: num.toHex(0),
      //   },
      ...estimatedFee1.resourceBounds,
      l1_gas: {
        ...estimatedFee1.resourceBounds.l1_gas,
        max_amount: num.toHex(
          BigInt(
            parseInt(estimatedFee1.resourceBounds.l1_gas.max_amount, 16) * 2
          ) // Double the estimated amount
        ),
      },
    };

    const { transaction_hash } = await account.execute(myCall, {
      version: 3,
      maxFee: estimatedFee1.suggestedMaxFee, // 10n ** 15n,
      feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1, // argentTMA.provider.RPC.EDataAvailabilityMode.L1,
      resourceBounds: resourceBounds,
    });

    await argentTMA.provider.waitForTransaction(transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

export async function executeContractAction_03(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  try {
    //   const decimalToHex = (decimal: number | bigint): string => {
    //     const bigDecimal = BigInt(decimal);
    //     return `0x${bigDecimal.toString(16)}`;
    //   };

    //   const hex = decimalToHex(amount);

    const myCall = contract.populate(action, [amount, 0]);

    // const maxQtyGasAuthorized = 1800n;
    // const maxPriceAuthorizeForOneGas = 20n * 10n ** 12n;

    const estimatedFee1 = await account.estimateInvokeFee([myCall], {
      version: 3,
    });

    const resourceBounds = {
      //   l1_gas: {
      //     max_amount: num.toHex(maxQtyGasAuthorized),
      //     max_price_per_unit: num.toHex(maxPriceAuthorizeForOneGas),
      //   },
      //   l2_gas: {
      //     max_amount: num.toHex(0),
      //     max_price_per_unit: num.toHex(0),
      //   },
      ...estimatedFee1.resourceBounds,
      l1_gas: {
        ...estimatedFee1.resourceBounds.l1_gas,
        max_amount: num.toHex(
          BigInt(
            parseInt(estimatedFee1.resourceBounds.l1_gas.max_amount, 16) * 2
          ) // Double the estimated amount
        ),
      },
    };

    const { transaction_hash } = await account.execute(myCall, {
      version: 3,
      maxFee: estimatedFee1.suggestedMaxFee, // 10n ** 15n,
      feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1, // argentTMA.provider.RPC.EDataAvailabilityMode.L1,
      resourceBounds: resourceBounds,
    });

    await argentTMA.provider.waitForTransaction(transaction_hash);
    return true;
  } catch (error) {
    console.error(`Error performing ${action}:`, error);
    return false;
  }
}

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

export async function executeContractAction_14(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [amount, 0],
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

export async function executeContractAction_15(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  const decimalToHex = (decimal: number | bigint): string => {
    const bigDecimal = BigInt(decimal);
    return `0x${bigDecimal.toString(16)}`;
  };

  const hex = decimalToHex(amount);
  const call: Call = {
    contractAddress: contract.address,
    entrypoint: action,
    calldata: [hex, "0x0"],
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

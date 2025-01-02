import { ArgentTMA, type SessionAccountInterface } from "@argent/tma-wallet";
import type { Call, Contract } from "starknet";

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

function toU256(amount: number) {
  const bigIntAmount = BigInt(amount);
  return {
    low: bigIntAmount & BigInt(0xffffffffffffffffn),
    high: bigIntAmount >> BigInt(128),
  };
}

export async function executeContractAction(
  contract: Contract,
  account: SessionAccountInterface,
  argentTMA: ArgentTMA,
  action: string,
  amount: number
) {
  const u256Amount = toU256(amount);

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

import { ArgentTMA } from "@argent/tma-wallet";

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

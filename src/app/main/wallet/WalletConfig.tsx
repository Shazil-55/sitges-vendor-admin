import { lazy } from "react";

const WalletUsers = lazy(() => import("./Wallet"));

/**
 * The Example page config.
 */
const WalletConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "wallet",
      element: <WalletUsers />,
    },
  ],
};

export default WalletConfig;

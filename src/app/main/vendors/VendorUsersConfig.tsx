import { lazy } from "react";

const VendorUsers = lazy(() => import("./VendorUsers"));

/**
 * The Example page config.
 */
const VendorUsersConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "profile",
      element: <VendorUsers />,
    },
  ],
};

export default VendorUsersConfig;

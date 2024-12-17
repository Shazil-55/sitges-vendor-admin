import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import { FuseRouteConfigsType, FuseRoutesType } from "@fuse/utils/FuseUtils";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import RestaurantsConfig from "../main/restaurants/RestaurantsConfig";
import PromoCodesConfig from "../main/promocodes/PromoCodesConfig";
import VendorUsersConfig from "../main/vendors/VendorUsersConfig";
import CategoriesConfig from "../main/categories/CategoriesConfig";
import ProductsConfig from "../main/products/ProductsConfig";
import WalletConfig from "../main/wallet/WalletConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import PromotionalCodesConfig from "../main/promotionalCode/PromotionalCodesConfig";

const routeConfigs: FuseRouteConfigsType = [
  SignOutConfig,
  SignInConfig,
  VendorUsersConfig,
  CategoriesConfig,
  PromoCodesConfig,
  PromotionalCodesConfig,
  RestaurantsConfig,
  ProductsConfig,
  WalletConfig,
  SignUpConfig,
];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth,
  ),
  {
    path: "/",
    element: <Navigate to="/profile" />,
    auth: settingsConfig.defaultAuth,
  },
  // {
  //   path: "/customers",
  //   element: <Navigate to="/customers" />,
  //   // auth: CustomerUsersConfig.defaultAuth,
  // },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;

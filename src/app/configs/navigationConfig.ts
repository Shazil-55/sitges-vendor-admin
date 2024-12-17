import i18next from "i18next";
import { FuseNavItemType } from "@fuse/core/FuseNavigation/types/FuseNavItemType";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
  
  {
    id: "Vendor-component",
    title: "Profile",
    translate: "Profile",
    type: "item",
    icon: "heroicons-outline:star",
    url: "profile",
  },
  {
    id: "Restaurant-component",
    title: "Restaurants",
    translate: "Restaurants",
    type: "item",
    icon: "heroicons-outline:star",
    url: "restaurants",
  },
  {
    id: "PromoCode-component",
    title: "PromoCodes",
    translate: "PromoCodes",
    type: "item",
    icon: "heroicons-outline:star",
    url: "promocodes",
  },
  {
    id: "PromotionalCode-component",
    title: "PromotionalSliders",
    translate: "PromotionalSliders",
    type: "item",
    icon: "heroicons-outline:star",
    url: "promotional-sliders",
  },
  {
    id: "Wallet-component",
    title: "Wallets",
    translate: "Wallets",
    type: "item",
    icon: "heroicons-outline:star",
    url: "wallet",
  }
];

export default navigationConfig;

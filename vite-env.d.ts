/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_SITGES_WEBSITE_URL: string;
  readonly VITE_SITGES_ADMIN_PANEL_URL: string;
  readonly VITE_SITGES_VENDOR_PORTAL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

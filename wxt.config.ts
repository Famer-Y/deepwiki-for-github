import { defineConfig } from 'wxt';

import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: () => {
    return {
      // default_locale: 'en',
      name: "DeepWiki X GitHub",
      permissions: [
        "tabs",
        "storage",
        'unlimitedStorage',
        "scripting",
        "sidePanel"
      ],
      "side_panel": {
        "default_path": "sidepanel.html"
      },
      "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArxBYPRDqi5nhBmLmJfSRAF77B9aK9hVu2gm6IvgmJYpmknu7y7H2kniLI7e4kzfImIutZGqHeYhQJze2X5sj4wyN5TGQVGKnorgcu6jygdMOmj8l3/9yUhrjHtRvfwXZ82qmtJx8rziZ0fZHjA+sFTfitI9RWRzBVAofDOiQGCavqV2xrcU1wvldLTDhYErHtJ0dt5+sfI/Fyq8Kk0eA3aGFSTnprUXFnOWPszU88uPgOAqZwBWO6BZemEBIR/P8v12RQTWMWr+Kt/ythlehfNIQ/XyaK/g9NUBMToWMtcuMODL4cY31zFiV2V5/FJ244c+URxozr62R+yA2pP2B8QIDAQAB"
    }
  },
  vite: () => ({
    // envPrefix: ["VITE_", "WXT_"],
    plugins: [tailwindcss()],
  }),
});

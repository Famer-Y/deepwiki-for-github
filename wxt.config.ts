import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    // default_locale: 'en',
    permissions: [
      "activeTab", "storage", "scripting", "sidePanel"
    ],
    "side_panel": {
      "default_path": "sidepanel.html"
    }
  },
});

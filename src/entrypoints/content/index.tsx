import "@/styles/global.css";

import ReactDOM from "react-dom/client";

import { ContentScriptContext } from "#imports";

import App from "./App";



export default defineContentScript({
    matches: ["*://github.com/*"],
    // matches: ['<all_urls>'],
    cssInjectionMode: "ui",
    registration: 'runtime',

    async main(ctx) {
        onMessage('content:is_loaded', () => {
            return 'ok';
        });

        console.log('main.tsx loaded');
        const ui = await createUi(ctx);
        ui.mount();
    },
});

function createUi(ctx: ContentScriptContext) {

    return createShadowRootUi(ctx, {
        name: "deepwiki-cs-ext",
        mode: "closed",
        position: "overlay",
        zIndex: 2147483647,
        inheritStyles: true,
        anchor: "html",
        append: "last",
        onMount: (container, shadow) => {
            const app = document.createElement('div');
            container.append(app);
            const root = ReactDOM.createRoot(app);
            root.render(
                <App  />
            );
            return root;
        },
        onRemove: (root) => {
            root?.unmount();
        },
    });
}
import "@/styles/global.css";

import ReactDOM from "react-dom/client";

import { ContentScriptContext } from "#imports";

import App from "./App";



export default defineContentScript({
    matches: ["*://*/*"],
    cssInjectionMode: "ui",

    async main(ctx) {
        console.log("content script loaded 1");
        const ui = await createUi(ctx);
        ui.mount();
    },
});

function createUi(ctx: ContentScriptContext) {

    return createShadowRootUi(ctx, {
        name: "fractal-cs-ext",
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
            const portalTarget = shadow.querySelector('body')!;
            root.render(
                // <Providers portalTarget={portalTarget}>
                    <App  />
                // </Providers>
            );
            return root;
        },
        onRemove: (root) => {
            root?.unmount();
        },
    });
}
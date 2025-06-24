import { sendMessage } from '@/utils/messaging.ts';


export default defineContentScript({
    // matches: ['<all_urls>'],
    matches: ["*://github.com/*"],
    cssInjectionMode: "ui",
    // registration: 'runtime',

    async main(ctx) {
        // analytics.page(window.location.toString());
        console.log('content.tsx loaded');

        await sendMessage('scripting:startInject', { url: window.location.toString() })
    },
});

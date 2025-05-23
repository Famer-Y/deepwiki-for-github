import { sendMessage } from "@/lib/utils";

browser.tabs.onActivated.addListener(async ({ tabId }) => {

    const tab = await browser.tabs.get(tabId);
    const { url = '' } = { ...tab };
    if (url) {
        try {
            await sendMessage('sidePanel:setTab', { tab });
        } catch (error) {
            // console.error(error);
        }
    }
});
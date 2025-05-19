import { sendMessage } from "@/lib/utils";

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.debug(tabId, changeInfo, tab);
    const { url = '' } = { ...tab };
    if (url) {
        try {
           await sendMessage('sidePanel:setTab', { tab });
        } catch (error) {
            // console.error(error);
        }
    }
});

import { sendMessage } from "@/lib/utils";
import getRepoUrl from "@/lib/getRepoUrl";

browser.tabs.onActivated.addListener(async ({ tabId }) => {

    const tab = await browser.tabs.get(tabId);
    const { url = '' } = { ...tab };
    if (url) {
        try {
            await sendMessage('sidePanel:setUrl', { url: getRepoUrl(url) });
        } catch (error) {
            // console.error(error);
        }
    }
});
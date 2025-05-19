import { onMessage } from '@/lib/utils';

onMessage('sidePanel:open', async ({ data, sender }) => {
    // console.log(await browser.sidePanel.getOptions({ tabId: sender.tab.id }));
    if (sender.tab) {
        return await browser.sidePanel.open({ windowId: sender.tab.windowId })
    }
    const tab = await browser.tabs.getCurrent();
    if (tab) {
        return await browser.sidePanel.open({ windowId: tab.windowId });
    }
});

browser.runtime.onInstalled.addListener(() => {
    browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

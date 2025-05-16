import { onMessage } from '@/lib/utils';

onMessage('sidePanel:open', async ({ data, sender }) => {
    // console.log(await browser.sidePanel.getOptions({ tabId: sender.tab.id }));
    
    return await browser.sidePanel.open({ tabId: sender.tab.id })
});


browser.runtime.onInstalled.addListener(() => {
    browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
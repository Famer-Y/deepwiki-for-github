
import { onMessage, sendMessage } from '@/utils/messaging.ts';

import getCurrentTab from '@/utils/getCurrentTab.ts';

onMessage('scripting:startInject', async ({ data, sender, }) => {
    console.log('scripting:startInject', data, sender);

    const tab = await getCurrentTab(sender.tab);
    if (!tab.id) {
        return 'no tab';
    }
    try {
        await sendMessage('content:is_loaded', {  }, tab.id)
        console.log('content:is_loaded ok');
        return 'ok';
    } catch (e) {
        // console.error('scripting:startInject error', e);
    }
    const res = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content-scripts/content.js'],
    });
    console.log('scripting:startInject res', res);
    return 'ok';
});

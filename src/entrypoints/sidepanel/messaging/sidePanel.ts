import { onMessage } from '@/lib/utils';

onMessage('sidePanel:isAlive', async ({ data, sender }) => {
    return true;
});

onMessage('sidePanel:close', () => {
    window.close();
});
import { onMessage } from '@/lib/utils';

onMessage('sidePanel:getUrl', async ({ data, sender }) => {
    return window.location.toString();
});
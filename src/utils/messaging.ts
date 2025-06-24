import { defineExtensionMessaging } from '@webext-core/messaging';


export const { sendMessage, onMessage } = defineExtensionMessaging<any>({
    logger: import.meta.env.DEV ? console : undefined
});

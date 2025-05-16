import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { defineExtensionMessaging } from '@webext-core/messaging';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const { sendMessage, onMessage } = defineExtensionMessaging<any>({
    logger: import.meta.env.DEV ? console : undefined
});

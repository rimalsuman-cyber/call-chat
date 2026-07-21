import { AppNotification } from '../types';

export function createToast(title: string, body: string): AppNotification {
  return { id: crypto.randomUUID(), title, body, read: false, createdAt: new Date().toISOString() };
}

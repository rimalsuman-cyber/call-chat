import { Message } from '../types';

export function createMessage(chatId: string, text: string, senderId = 'user-current', senderName = 'You'): Message {
  return {
    id: crypto.randomUUID(),
    chatId,
    senderId,
    senderName,
    text,
    timestamp: new Date().toISOString(),
    status: 'sent'
  };
}

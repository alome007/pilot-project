import { fetchWithAuth } from './http.service';

export interface Message {
  id: string;
  threadId: string;
  content: string;
  senderId: string;
  sentAt: string;
  read: boolean;
}

export interface MessageThread {
  id: string;
  aliasId: string;
  subject: string;
  participants: string[];
  lastMessageAt: string;
  messages: Message[];
}

export async function getUserInboxes(aliasId?: string): Promise<MessageThread[]> {
  const endpoint = aliasId ? `/messages/inboxes?aliasId=${aliasId}` : '/messages/inboxes';
  return fetchWithAuth(endpoint);
}

export async function getMessageThread(threadId: string): Promise<MessageThread> {
  return fetchWithAuth(`/messages/thread/${threadId}`);
}

export async function sendReply(threadId: string, content: string): Promise<Message> {
  return fetchWithAuth('/messages/reply', {
    method: 'POST',
    body: JSON.stringify({ threadId, content }),
  });
}

export async function markAsRead(messageIds: string[]): Promise<void> {
  return fetchWithAuth('/messages/mark-read', {
    method: 'POST',
    body: JSON.stringify({ messageIds }),
  });
}

export async function archiveMessage(messageId: string): Promise<void> {
  return fetchWithAuth(`/messages/archive/${messageId}`, {
    method: 'POST',
  });
}

export async function deleteMessage(messageId: string): Promise<void> {
  return fetchWithAuth(`/messages/${messageId}`, {
    method: 'DELETE',
  });
}
export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Message {
  id: string;
  threadId: string;
  content: string;
  senderId: string;
  sentAt: FirebaseFirestore.Timestamp;
  attachments: Attachment[];
  read: boolean;
  archived?: boolean;
  archivedAt?: FirebaseFirestore.Timestamp;
}


export interface MessageThread {
  id?: string;
  alias: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
  isRead: boolean;
  hasAttachment: boolean;
  canReply: boolean;
  messages: Array<{
    content: string;
    timestamp: string;
    fromMe: boolean;
  }>;
}
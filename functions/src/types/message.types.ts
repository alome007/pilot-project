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
  id: string;
  aliasId: string;
  subject: string;
  participants: string[];
  lastMessageAt: FirebaseFirestore.Timestamp;
  createdAt: FirebaseFirestore.Timestamp;
  labels?: string[];
}
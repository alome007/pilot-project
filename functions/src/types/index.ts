export interface UserPlan {
  planId: string;
  planName: string;
  features: string[];
  nextBillingDate?: string;
  status: 'active' | 'cancelled' | 'past_due';
}

export interface DashboardStats {
  totalAliases: number;
  totalEmails: number;
  blockedSenders: number;
  lastUpdated: string;
}

export interface Email {
  id: string;
  subject: string;
  from: string;
  to: string;
  content: string;
  receivedAt: string;
  read: boolean;
  aliasId: string;
}

export interface Alias {
  id: string;
  userId: string;
  alias: string;
  destination: string;
  createdAt: string;
  active: boolean;
}

export interface Invoice {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  createdAt: string;
  paidAt?: string;
}
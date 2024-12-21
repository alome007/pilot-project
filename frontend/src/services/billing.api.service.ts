import { fetchWithAuth } from './http.service';

export interface BillingHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  createdAt: string;
  paidAt?: string;
}

export interface UserPlan {
  planId: string;
  planName: string;
  features: string[];
  nextBillingDate?: string;
  status: 'active' | 'cancelled' | 'past_due';
}

export async function getBillingHistory(): Promise<BillingHistory[]> {
  return fetchWithAuth('/billing/history');
}

export async function getUserPlan(): Promise<UserPlan> {
  return fetchWithAuth('/billing/plan');
}

export async function upgradePlan(planId: string) {
  return fetchWithAuth('/billing/upgrade', {
    method: 'POST',
    body: JSON.stringify({ planId }),
  });
}
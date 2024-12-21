import { fetchWithAuth } from './http.service';

export interface UserInfo {
  email: string;
  name: string;
  planId: string;
  planName: string;
  createdAt: string;
  features: string[];
}

export interface DashboardStats {
  totalAliases: number;
  totalEmails: number;
  blockedSenders: number;
  lastUpdated: string;
}

export async function getUserInfo(): Promise<UserInfo> {
  return fetchWithAuth('/user/info');
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchWithAuth('/user/stats');
}
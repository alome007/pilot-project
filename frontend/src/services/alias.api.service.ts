import { fetchWithAuth } from './http.service';

export interface Alias {
  id: string;
  alias: string;
  destination: string;
  createdAt: string;
  active: boolean;
}

export async function createAlias (alias: string, destination: string): Promise<Alias> {
  return fetchWithAuth('/alias/create', {
    method: 'POST',
    body: JSON.stringify({ alias, destination }),
  });
}

export async function getAliases (): Promise<Alias[]> {
  return fetchWithAuth('/alias/inbox', { method: 'GET' });
}

export async function deleteAlias (aliasId: string): Promise<void> {
  return fetchWithAuth(`/alias/${aliasId}`, {
    method: 'DELETE',
  });
}

export async function updateAlias (aliasId: string, active: boolean): Promise<Alias> {
  return fetchWithAuth(`/alias/${aliasId}`, {
    method: 'PATCH',
    body: JSON.stringify({ active }),
  });
}
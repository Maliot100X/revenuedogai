import { config } from './config';

export async function oneclawRequest(path: string, options?: RequestInit) {
  const res = await fetch(`${config.oneclaw.apiUrl}${path}`, {
    headers: {
      'Authorization': `Bearer ${config.oneclaw.apiKey}`,
      'Content-Type': 'application/json',
    },
    ...options,
  });
  return res.json();
}

export async function listAgents() {
  return oneclawRequest('/agents');
}

export async function getAgent(id: string) {
  return oneclawRequest(`/agents/${id}`);
}

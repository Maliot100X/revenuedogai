import { config } from './config';

export async function oneclawRequest(path: string, options?: RequestInit) {
  const res = await fetch(`https://api.1claw.xyz/v1${path}`, {
    headers: {
      'Authorization': `Bearer ${config.oneclaw.apiKey}`,
      'Content-Type': 'application/json',
    },
    ...options,
  });
  return res.json();
}

export async function getAgents() {
  return oneclawRequest('/agents');
}

export async function getAgent(id: string) {
  return oneclawRequest(`/agents/${id}`);
}

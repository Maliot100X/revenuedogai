import { config } from './config';

export async function clawpumpRequest(path: string, options?: RequestInit) {
  if (!config.clawpump.apiKey) {
    return { error: 'ClawPump API key not configured. Get a cpk_* key from dev@clawpump.tech' };
  }
  const res = await fetch(`${config.clawpump.apiUrl}${path}`, {
    headers: {
      'Authorization': `Bearer ${config.clawpump.apiKey}`,
      'Content-Type': 'application/json',
    },
    ...options,
  });
  return res.json();
}

export async function listAgents() {
  return clawpumpRequest('/agents');
}

export async function createAgent(name: string, strategy?: string) {
  return clawpumpRequest('/agents', {
    method: 'POST',
    body: JSON.stringify({ name, strategy }),
  });
}

export async function startAgent(id: string) {
  return clawpumpRequest(`/agents/${id}/start`, { method: 'POST' });
}

export async function stopAgent(id: string) {
  return clawpumpRequest(`/agents/${id}/stop`, { method: 'POST' });
}

export async function chatAgent(id: string, message: string) {
  return clawpumpRequest(`/agents/${id}/chat`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

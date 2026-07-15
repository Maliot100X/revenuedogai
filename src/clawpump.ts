import { config } from './config';

const headers = {
  'Authorization': `Bearer ${config.clawpump.apiKey}`,
  'Content-Type': 'application/json',
};

export async function clawpumpRequest(path: string, options?: RequestInit) {
  const res = await fetch(`${config.clawpump.apiUrl}${path}`, {
    headers,
    ...options,
  });
  return res.json();
}

export async function listAgents() {
  return clawpumpRequest('/agents');
}

export async function getAgent(id: string) {
  return clawpumpRequest(`/agents/${id}`);
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

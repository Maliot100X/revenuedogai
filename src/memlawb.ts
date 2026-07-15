import { config } from './config';

export async function saveMemory(namespace: string, key: string, content: string) {
  const res = await fetch(`${config.memlawb.url}/api/memory/${namespace}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${config.memlawb.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      entries: { [key]: content },
    }),
  });
  return res.json();
}

export async function loadMemory(namespace: string) {
  const res = await fetch(`${config.memlawb.url}/api/memory/${namespace}`, {
    headers: {
      'Authorization': `Bearer ${config.memlawb.apiKey}`,
    },
  });
  return res.json();
}

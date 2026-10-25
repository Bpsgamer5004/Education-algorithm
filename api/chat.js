export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const NVIDIA_API_KEY = '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';
  const NVIDIA_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';

  try {
    const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const response = await fetch(NVIDIA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`
      },
      body: payload
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Proxy error' });
  }
}

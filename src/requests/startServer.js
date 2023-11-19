const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function startServer() {
  try {
    const response = await fetch(`${BACKEND_URL}/user/start`, {
      method: 'GET',
      headers: { 
        'content-type': 'application/json',
      },
    });
    await response.json();
  } catch(err) {
    return err;
  }
}

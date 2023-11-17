const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function getUserData(token) {
  try {
    const response = await fetch(`${BACKEND_URL}/user`, {
      method: 'GET',
      headers: { 
        'content-type': 'application/json',
        'authorization': token
      },
    });
    const result = await response.json();
    return result;
  } catch(err) {
    return err;
  }
}

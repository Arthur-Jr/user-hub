const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function addEmail(token, userData) {
  try {
    const payload = { email: userData.email, password: userData.password };
    const response = await fetch(`${BACKEND_URL}/user/test-email`, {
      method: 'PUT',
      headers: { 
        'content-type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch(err) {
    return err;
  }
}
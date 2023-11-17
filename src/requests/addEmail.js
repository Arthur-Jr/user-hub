const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function addEmail(token, useData) {
  try {
    const response = await fetch(`${BACKEND_URL}/user/test-email`, {
      method: 'PUT',
      headers: { 
        'content-type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(useData),
    });
    const result = await response.json();
    return result;
  } catch(err) {
    return err;
  }
}
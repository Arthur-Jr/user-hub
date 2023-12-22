import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function addEmail(userData) {
  try {
    const payload = { email: userData.email, password: userData.password };
    const response = await axios.put(`${BACKEND_URL}/user/test-email`,payload , {
      withCredentials: true,
      headers: { 
        'content-type': 'application/json',
      },
    });

    return response;
  } catch(err) {
    return err.response;
  }
}
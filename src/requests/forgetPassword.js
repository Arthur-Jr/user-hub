import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function forgetPassword(email) {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/forgot-password`, { email }, {
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
      },
    });

    return { message: 'Email Sent!', status: response.status };
  } catch(err) {
    if (err.code === 'ECONNABORTED') {
      return { message: 'Server is offline, it take atleast 3 minutes to start server!', status: 500 };
    }

    return { message: err.response.data.message, status: err.response.status };
  }
}

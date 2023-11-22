import axios from 'axios';
import getUserData from './getUserData';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function editUser(token, userData) {
  let response = { message: '', status: 201 };

  try {
    await axios.put(`${BACKEND_URL}/user`, userData, {
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
        'authorization': token
      },
    });

    if (userData.email) {
      const data = await getUserData(token);
      response.email = data.email;
    }

    response.message = 'Data edited successful!';
    return response;
  } catch(err) {
    if (err.code === 'ECONNABORTED') {
      return { message: 'Server is offline, it take atleast 3 minutes to start server!', status: 500 };
    }

    return { message: err.response.data.message, status: err.response.status };
  }
}

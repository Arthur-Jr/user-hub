import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

function checkRegisterOption(userData) {
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

  if (userData.email.length < 0 || !EMAIL_REGEX.test(userData.email)) {
    return { username: userData.username, password: userData.password };
  } else {
    return { email: userData.email, username: userData.username, password: userData.password };
  }
}

export default async function register(userData) {
  try {
    const userRegister = checkRegisterOption(userData);

    const response = await axios.post(`${BACKEND_URL}/user/register`, userRegister, {
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
      },
    });

    return response.data;
  } catch(err) {
    if (err.code === 'ECONNABORTED') {
      return { message: 'Server is offline, it take atleast 3 minutes to start server!' };
    }

    return err.response.data;
  }
}

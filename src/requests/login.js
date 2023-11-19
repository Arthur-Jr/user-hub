import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

function checkLoginOption(userData) {
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  if (EMAIL_REGEX.test(userData.usernamePassword)) {
    return { email: userData.usernamePassword, password: userData.password };
  } else {
    return { username: userData.usernamePassword, password: userData.password };
  }
}

export default async function login(userData) {
  try {
    const userLogin = checkLoginOption(userData);

    const response = await axios.post(`${BACKEND_URL}/user/login`, userLogin, {
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

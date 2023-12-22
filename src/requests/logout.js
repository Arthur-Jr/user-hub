import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

function checkLoginOption(userData) {
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  if (EMAIL_REGEX.test(userData.usernameEmail)) {
    return { email: userData.usernameEmail, password: userData.password };
  } else {
    return { username: userData.usernameEmail, password: userData.password };
  }
}

export default async function logout() {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/logout`, {}, {
      withCredentials: true,
      timeout: 10000,
      headers: { 
        'content-type': 'application/json',
      },
    });

    return response;
  } catch(err) {
    if (err.code === 'ECONNABORTED') {
      return { data: { message: 'Server is offline, it take atleast 3 minutes to start server!' } };
    }

    return err.response;
  }
}

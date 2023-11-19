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

    const response = await fetch(`${BACKEND_URL}/user/login`, {
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
      },
      body: JSON.stringify(userLogin)
    });
    const result = await response.json();
    return result;
  } catch(err) {
    return err;
  }
}

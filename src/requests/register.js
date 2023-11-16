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

    const response = await fetch(`${BACKEND_URL}/user/register`, {
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
      },
      body: JSON.stringify(userRegister)
    });
    const result = await response.json();
    return result;
  } catch(err) {
    return err;
  }
}

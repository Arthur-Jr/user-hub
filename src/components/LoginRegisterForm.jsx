'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import constants from '@/constants/data';
import login from '@/requests/login';
import register from '@/requests/register';
import Form from './Form';
import endpoints from '@/constants/endpoints';

function LoginRegisterForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [responseMsg, setResponseMsg] = useState('');
  const registerFormFields = ['username', 'email', 'password', 'confirmPassword'];
  const loginFormFields = ['usernamePassword', 'password'];
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem(constants.localStorageTokenName);

    if (token) {
      router.push(endpoints.projects);
    }
  }, [router]);

  const handleSubmit = async (e, userData) => {
    e.preventDefault();
    let result;

    if (isLogin) {
      result = await login(userData);
    } else {
      result = await register(userData);
    }

    if (result.token) {
      localStorage.setItem(constants.localStorageTokenName, result.token);
      router.push(endpoints.projects);
    } else {
      setResponseMsg(result.message);
    }
  }

  const handleLinkClick = () => {
    setIsLogin(!isLogin);
    setResponseMsg('');
  }

  return (
    <section 
      className="flex flex-col items-center justify-around bg-primary-color p-5 w-full h-[100vh] sm:h-[660px] sm:w-[500px] sm:rounded-2xl"
    >
      <h1 className="text-6xl italic font-bold text-white">{ isLogin ? 'Login' : 'Register' }</h1>

      { isLogin ? 
        <Form fields={ loginFormFields } page="login" setResponseMsg={ setResponseMsg } handleSubmit={ handleSubmit } /> :
        <Form fields={ registerFormFields } page="register" setResponseMsg={ setResponseMsg } handleSubmit={ handleSubmit }/>  
      }
      { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black">{ responseMsg }</span> }

      <button
        type="button"
        onClick={ () => handleLinkClick() }
        className="text-lg font-bold italic text-white hover:underline underline-offset-4"
      >
        { isLogin ? 'Register a new account' : 'Login' }
      </button>
    </section>
  )
}

export default LoginRegisterForm;

'use client';

import { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterFrom from './RegisterFrom';

function LoginRegisterForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section 
      className="flex flex-col items-center justify-around bg-primary-color p-5 w-full h-[100vh] sm:h-[600px] sm:w-[500px] sm:rounded-2xl"
    >
      <h1 className="text-6xl italic font-bold text-white">{ isLogin ? 'Login' : 'Register' }</h1>

      { isLogin ? <LoginForm /> : <RegisterFrom/> }

      <button
        type="button"
        onClick={ () => setIsLogin(!isLogin)}
        className="text-lg font-bold italic text-white hover:underline underline-offset-4"
      >
        { isLogin ? 'Register a new account' : 'Login' }
      </button>
    </section>
  )
}

export default LoginRegisterForm
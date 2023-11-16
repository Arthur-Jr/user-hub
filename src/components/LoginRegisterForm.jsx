'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function LoginRegisterForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('my-user-hub-token');

    if (token) {
      router.push('/projects');
    }
  }, [router]);

  return (
    <section 
      className="flex flex-col items-center justify-around bg-primary-color p-5 w-full h-[100vh] sm:h-[660px] sm:w-[500px] sm:rounded-2xl"
    >
      <h1 className="text-6xl italic font-bold text-white">{ isLogin ? 'Login' : 'Register' }</h1>

      { isLogin ? <LoginForm /> : <RegisterForm/> }

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

export default LoginRegisterForm;

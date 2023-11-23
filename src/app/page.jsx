'use client';

import { LoginForm, RegisterForm } from "@/components";
import constants from "@/constants/data";
import endpoints from "@/constants/endpoints";
import login from "@/requests/login";
import register from "@/requests/register";
import startServer from "@/requests/startServer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [responseMsg, setResponseMsg] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    startServer();
    const token = localStorage.getItem(constants.localStorageTokenName);

    if (token) {
      router.push(endpoints.projects);
    }
  }, [router]);

  const handlePasswordSimilarity = (userData) => {
    if (userData.password.length > 0 && userData.confirmPassword.length > 0 && userData.password === userData.confirmPassword) {
      setResponseMsg('');
      return true;
    }

    setResponseMsg('Passwords not equal!');
    return false;
  }

  const handleSubmit = async (userData) => {
    if (!isLogin && !handlePasswordSimilarity(userData)) {
      return;
    }

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
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section 
        className="flex flex-col items-center justify-evenly bg-primary-color pt-5 px-10 w-full h-screen sm:h-[660px] sm:w-[500px] sm:rounded-2xl"
      >
        <h1 className="text-5xl italic font-bold text-white mb-2">{ isLogin ? 'Login' : 'Register' }</h1>

        { isLogin ? 
          <LoginForm login={ handleSubmit } /> :
          <RegisterForm registerUser={ handleSubmit } />  
        }
        { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center mb-4">{ responseMsg }</span> }

        <div className="flex flex-col justify-between items-center h-16">
          { isLogin &&
            <Link href="/reset" className="text-lg font-bold italic text-white hover:underline underline-offset-4">Forgot Password</Link>
          }

          <button
            type="button"
            onClick={ () => handleLinkClick() }
            className="text-lg font-bold italic text-white hover:underline underline-offset-4"
          >
            { isLogin ? 'Register a new account' : 'Login' }
          </button>
        </div>
      </section>
    </main>
  )
}

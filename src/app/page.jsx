'use client';

import { LoginForm, RegisterForm } from '@/components';
import endpoints from '@/constants/endpoints';
import handlePasswordSimilarity from '@/globalFuncs/passwordSimilarity';
import getUserData from '@/requests/getUserData';
import login from '@/requests/login';
import register from '@/requests/register';
import startServer from '@/requests/startServer';
import { HttpStatusCode } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loadingImg from '../../public/loading-img.svg';


export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [responseMsg, setResponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    startServer();
    getUserData().then((user) => {
      if(user.username) {
        router.push(endpoints.projects);
      }
    });
  }, [router]);

  const handleSubmit = async (userData) => {
    setResponseMsg('');
    setIsLoading(true);

    if (!isLogin && !handlePasswordSimilarity(userData, setResponseMsg)) {
      setResponseMsg('Passwords not equal!');
      return;
    }

    let result;

    if (isLogin) {
      result = await login(userData);
    } else {
      result = await register(userData);
    }

    if (result.status === HttpStatusCode.Ok || result.status === HttpStatusCode.Created) {
      router.push(endpoints.projects);
    } else {
      setIsLoading(false);
      setResponseMsg(result.data.message);
    }
  }

  const handleLinkClick = () => {
    setIsLogin(!isLogin);
    setResponseMsg('');
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section 
        className="flex flex-col items-center justify-evenly bg-primary-color pt-5 px-10 w-full h-[600px] sm:h-[660px] sm:w-[500px] sm:rounded-2xl"
      >
        <h1 className="text-5xl italic font-bold text-white mb-2">{ isLogin ? 'Login' : 'Register' }</h1>

        { isLogin ? 
          <LoginForm login={ handleSubmit } /> :
          <RegisterForm registerUser={ handleSubmit } />  
        }

        { isLoading && 
          <div className="flex items-center">
            <Image src={ loadingImg } alt="loading" className="rounded-full" width={30} height={30} />
          </div> 
        }

        <span className="text-lg italic font-bold text-black text-center mb-4">{ responseMsg }</span>

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

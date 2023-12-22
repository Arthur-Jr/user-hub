'use client';

import constants from '@/constants/data';
import endpoints from '@/constants/endpoints';
import forgetPassword from '@/requests/forgetPassword';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loadingImg from '../../../public/loading-img.svg';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorageTokenName);

    if (token) {
      router.push(endpoints.projects);
    }    
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    setIsLoading(true);

    const result = await forgetPassword(email);
    setIsLoading(false);
    setResponseMsg(result.message);
  }

  return (
    <main className="flex flex-col items-center w-full">
      <div className="mb-16 flex items-start w-full p-5">
        <Link href="/" className="uppercase text-lg hover:underline underline-offset-2">{'< back'}</Link>
      </div>

      <h1 className="text-center text-3xl font-bold italic mb-5">Recover Password</h1>

      <div className="flex flex-col items-center h-[550px]">
        <form
          className="flex flex-col items-center justify-around w-full sm:w-[500px] h-[220px] text-black" 
          onSubmit={ (e) => handleSubmit(e) }
        >
          <label htmlFor="email-input" className="flex flex-col items-center text-xl font-bold italic uppercase w-[90%] sm:w-[75%]">
            Email

            <input
              type="text"
              value={ email }
              id="email-input"
              className="mt-2 text-black p-2 rounded-md w-full border-2 border-black"
              maxLength="30"
              minLength="10"
              required
              onChange={ ({ target }) => setEmail(target.value) } 
            />
          </label>

          <button
            type="submit"
            disabled={ isLoading }
            className="text-2xl font-extrabold italic border-2 border-black p-3 w-[200px] uppercase text-white rounded-md hover:scale-105 bg-primary-color"
          >
            Send
          </button>
        </form>

        { isLoading && 
          <div className="flex items-center">
            <Image src={ loadingImg } alt="loading" className="rounded-full" width={45} height={45} />
          </div>
        }

        { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
      </div>
    </main>
  );
}

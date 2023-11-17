'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getUserData from '@/requests/getUserData';
import TestUserMessage from './TestUserMessage';
import constants from '@/constants/data';

function Header() {
  const links = ['projects', 'account'];
  const ACC_TYPE = { test: 0, valid: 1 };
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorageTokenName);
    
    if (!token) {
      router.push('/');
    }

    getUserData(token).then((result) => {
      if (result.status) {
        setUserData(result);
      } else {
        router.push('/');
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(constants.localStorageTokenName);
    router.push('/');
  }

  return (
    <>
      { userData.status === ACC_TYPE.test && <TestUserMessage /> }

      <header className="flex items-center justify-between h-20 w-full p-3 sm:p-10 bg-white shadow-md mb-6">
        <div className="flex justify-between italic w-40 text-primary-color font-semibold text-sm sm:text-xl sm:w-60">
          { links.map((link) => (
            <Link key={link} href={link} className="uppercase hover:underline underline-offset-2">
              {link}
            </Link>
          )) }
        </div>

        <div className="flex flex-col">
          <h1 className="text-base sm:text-2xl font-bold italic text-primary-color">Hi, { userData.username }</h1>
          <button 
            type="button"
            onClick={ () => handleLogout() }
            className="self-end italic text-base font-semibold underline underline-offset-2 hover:text-primary-color"
          >
            logout
          </button>
        </div>
      </header>
    </>
  )
}

export default Header

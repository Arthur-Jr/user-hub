'use client';

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getUserData from '@/requests/getUserData';
import TestUserMessage from './TestUserMessage';
import constants from '@/constants/data';
import endpoints from '@/constants/endpoints';
import { appContext } from '@/context/AppProvider';
import Loading from '@/app/loading';

function Header() {
  const links = ['projects', 'account'];
  const ACC_TYPE = { test: 0, valid: 1 };
  const { userData, setUserData } = useContext(appContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorageTokenName);
    
    if (!token) {
      router.push(endpoints.home);
      return;
    }
    
    getUserData(token).then((result) => {
      if (result.username) {
        setUserData(result);
      } else {
        localStorage.removeItem(constants.localStorageTokenName);
        router.push(endpoints.home);
      }
    });
  }, [router, setUserData]);

  const handleLogout = () => {
    localStorage.removeItem(constants.localStorageTokenName);
    router.push(endpoints.home);
  }

  return (
    <>
      { userData.status === ACC_TYPE.test && <TestUserMessage /> }
      { userData.username.length === 0 && <Loading /> }

      { userData.username.length > 0 &&
        <header className="flex items-center justify-between h-20 w-full p-3 sm:p-10 bg-white shadow-md mb-6">
          <div className="flex justify-between italic w-40 text-primary-color font-semibold text-sm sm:text-xl sm:w-60">
            { links.map((link) => (
              <Link key={link} href={endpoints[link]} className="uppercase hover:underline underline-offset-2">
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
      } 
    </>
  )
}

export default Header

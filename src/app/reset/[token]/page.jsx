'use client';

import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import endpoints from "@/constants/endpoints";
import getUserData from "@/requests/getUserData";
import resetPassword from "@/requests/resetPassword";
import constants from "@/constants/data";

function ResetPassword({ params: { token } }) {
  const [responseMsg, setResponseMsg] = useState('');
  const formFields = ['password', 'confirmPassword'];
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(constants.localStorageTokenName);
      router.push(endpoints.home);
      return;
    }

    const { data } = jwtDecode(token);
    if (!data.reset) {
      localStorage.removeItem(constants.localStorageTokenName);
      router.push(endpoints.home);
      return;
    }

    getUserData(token).then((result) => {
      if (!result.username) {
        localStorage.removeItem(constants.localStorageTokenName);
        router.push(endpoints.home);
      }
    });
  }, [router, token]);

  const handleSubmit = async (e, userData) => {
    e.preventDefault();

    const result = await resetPassword(token, userData);

    if (result.status === 204) {
      setResponseMsg(result.message);

      setTimeout(() => {
        router.push(endpoints.home);
      }, 6000);
    }

    if (result.status === 500) {
      setResponseMsg(result.message);
    }

    if (result.status === 401) {
      router.push(endpoints.home);
    }
  }

  return (
    <main className="flex flex-col items-center w-[100%] p-10">
      <h1 className="text-center text-3xl font-bold italic mb-5">Reset Password</h1>

      <div className="flex flex-col items-center w-[400px] h-[550px]">
        <Form fields={ formFields } setResponseMsg={ setResponseMsg } handleSubmit={ handleSubmit } page="reset" />

        { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
      </div>
    </main>
  )
}

export default ResetPassword;;

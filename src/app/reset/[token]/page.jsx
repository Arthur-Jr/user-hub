'use client';

import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import endpoints from "@/constants/endpoints";
import getUserData from "@/requests/getUserData";

function ResetPassword({ params: { token } }) {
  const [responseMsg, setResponseMsg] = useState('');
  const formFields = ['password', 'confirmPassword'];
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push(endpoints.home);
      return;
    }

    getUserData(token).then((result) => {
      if (!result.username) {
        router.push(endpoints.home);
      }
    });
  }, [router, token]);

  const handleSubmit = (e, userData) => {
    e.preventDefault();
  }

  return (
    <main className="h-[100vh] flex flex-col items-center w-[100%] p-10">
      <h1 className="text-center text-3xl font-bold italic mb-5">Reset Password</h1>

      <div className="flex flex-col items-center w-[400px] h-[450px]">
        <Form fields={ formFields } setResponseMsg={ setResponseMsg } handleSubmit={ handleSubmit } page="reset" />

        { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
      </div>
    </main>
  )
}

export default ResetPassword;;

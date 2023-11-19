'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { Header } from "@/components"
import constants from "@/constants/data";
import addEmail from "@/requests/addEmail";
import Form from "@/components/Form";

function AddEmail() {
  const router = useRouter();
  const [responseMsg, setResponseMsg] = useState('');
  const formFields = ['email', 'password']

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorageTokenName);
    let userData;

    if (token) {
      const { data } = jwtDecode(token);
      userData = data;
    }

    if (token && userData.status !== 0) {
      router.push('/projects');
    }
  }, [router]);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    const token = localStorage.getItem(constants.localStorageTokenName);
    const result = await addEmail(token, formData);

    if (result.token) {
      localStorage.setItem(constants.localStorageTokenName, result.token);
      router.push('/projects');
    } else {
      setResponseMsg(result.message);
    }
  }

  return (
    <main className="sm:h-[100vh] w-full">
      <Header />

      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-xl font-bold italic mb-5">Add an email to your test account!</h1>

        <Form fields={ formFields } handleSubmit={ handleSubmit } setResponseMsg={ setResponseMsg } page="add email"/>

        { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
      </div>
    </main>
  )
}

export default AddEmail;

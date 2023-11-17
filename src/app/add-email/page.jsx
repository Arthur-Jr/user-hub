'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { Header } from "@/components"
import constants from "@/constants/data";
import addEmail from "@/requests/addEmail";

function AddEmail() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
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

  const handleSubmit = async (e) => {
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
      
      <h1 className="text-center text-xl font-bold italic mb-5">Add an email to your test account!</h1>

      <div className="h-80 w-full flex flex-col items-center">
        <form className="h-72 flex flex-col justify-around w-full items-center" onSubmit={ (e) => handleSubmit(e) }>
        { formFields.map((field) => (
            <label key={ field } htmlFor={ `${field}-input` } className="flex flex-col items-center text-xl font-bold italic uppercase">
              { field }

              <input
                id={ `${field}-input` }
                value={ formData[field] }
                type={ field === formFields[1] ? 'password' : 'text' }
                onChange={ ({ target }) => setFormData({ ...formData, [field]: target.value }) }
                className="mt-2 text-black p-2 rounded-md border-2 border-black"
                required
                maxLength={ field === formFields[1] ? '16' : '30' }
              />
            </label>
          ))}

          <button
            type="submit"
            className={`text-2xl font-extrabold italic p-3 w-[200px] bg-primary-color text-white rounded-md hover:scale-105`}
          >
            Send
          </button>
        </form>

        { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
      </div>
    </main>
  )
}

export default AddEmail;

'use client';

import login from '@/requests/login';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import constants from '@/constants/data';

function LoginForm() {
  const [formData, setFormData] = useState({ loginOption: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const formFields = ['loginOption', 'password'];
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(formData);

    if (result.token) {
      localStorage.setItem(constants.localStorageTokenName, result.token);
      router.push('/projects');
    } else {
      setResponseMsg(result.message);
    }
  }

  return (
    <>
      <form
      className="flex flex-col items-center justify-around w-full h-[350px] text-white"
      onSubmit={ (e) => handleLogin(e) }
      >
        { formFields.map((field) => (
          <label key={ field } htmlFor={ `${field}-input` } className="flex flex-col items-center text-xl font-bold italic uppercase">
            { field === 'password' ? field : 'username/email' }

            <input
              id={ `${field}-input` }
              value={ field === 'password' ? formData.password : formData.loginOption }
              type={ field === 'password' ? 'password' : 'text' }
              onChange={ ({ target }) => setFormData({ ...formData, [field]: target.value }) }
              className="mt-3 text-black p-3 rounded-md"
              required
            />
          </label>
        )) }

        <button
          type="submit"
          className="text-2xl font-extrabold italic bg-white p-3 w-[200px] text-primary-color rounded-md hover:scale-105"
        >
          Login
        </button>

      </form>
      { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black">{ responseMsg }</span> }
    </>
  )
}

export default LoginForm;

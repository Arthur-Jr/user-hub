'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import register from '@/requests/register';

function RegisterForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const formFields = ['username', 'email', 'password'];
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await register(formData);

    if (result.token) {
      localStorage.setItem("my-user-hub-token", result.token);
      router.push('/projects');
    } else {
      setResponseMsg(result.message);
    }
  }

  return (
    <>
      <form
        className="flex flex-col items-center justify-around w-full h-[380px] text-white"
        onSubmit={ (e) => handleRegister(e) }
      >
        { formFields.map((field) => (
          <>
            <label key={ field } htmlFor={ `${field}-input` } className="flex flex-col items-center text-xl font-bold italic uppercase">
              { field }

              <input
                id={ `${field}-input` }
                value={ formData[field] }
                type={ field === 'password' ? 'password' : 'text' }
                onChange={ ({ target }) => setFormData({ ...formData, [field]: target.value }) }
                className="mt-2 text-black p-2 rounded-md"
                required={ field !== 'email'}
                maxLength={ field === 'password' ? '16' : '30' }
              />
            </label>

            { field === 'email' &&
              <span className="text-sm font-bold italic mt-[-12px] text-black">You can create a test account without email!</span>
            }
          </>
        ))}

        <button
          type="submit"
          className="text-2xl font-extrabold italic bg-white p-3 w-[200px] text-primary-color rounded-md hover:scale-105"
        >
          Register
        </button>
      </form>
      
      { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black">{ responseMsg }</span> }
    </>
  )
}

export default RegisterForm;


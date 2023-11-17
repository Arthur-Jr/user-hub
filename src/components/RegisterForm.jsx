'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import register from '@/requests/register';
import constants from '@/constants/data';

function RegisterForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const [isBtnAble, setIsBtnAble] = useState(true);
  const formFields = ['username', 'email', 'password', 'confirm password'];
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await register(formData);

    if (result.token) {
      localStorage.setItem(constants.localStorageTokenName, result.token);
      router.push('/projects');
    } else {
      setResponseMsg(result.message);
    }
  }

  const handleFieldChange = (target, field) => {
    if (field === formFields[3] || field === formFields[2]) {
      handleConfirmPassword(target);
    }

    setFormData({ ...formData, [field]: target.value });
  }

  const handleConfirmPassword = ({ value }) => {
    if (value !== formData.password) {
      setResponseMsg('Passwords not equal!');
      setIsBtnAble(true);
    } else {
      setResponseMsg('');
      setIsBtnAble(false);
    }
  }

  return (
    <>
      <form
        className="flex flex-col items-center justify-around w-full h-[480px] text-white"
        onSubmit={ (e) => handleRegister(e) }
      >
        { formFields.map((field) => (
          <>
            <label key={ field } htmlFor={ `${field}-input` } className="flex flex-col items-center text-xl font-bold italic uppercase">
              { field }

              <input
                id={ `${field}-input` }
                value={ formData[field] }
                type={ field === formFields[2] || field === formFields[3] ? 'password' : 'text' }
                onChange={ ({ target }) => handleFieldChange(target, field) }
                className="mt-2 text-black p-2 rounded-md"
                required={ field !== 'email'}
                maxLength={ field === formFields[2] ? '16' : '30' }
              />
            </label>

            { field === 'email' &&
              <span className="text-sm font-bold italic mt-[-12px] text-black">You can create a test account without email!</span>
            }
          </>
        ))}

        <button
          type="submit"
          className={`text-2xl font-extrabold italic ${ isBtnAble ? 'bg-gray-900' : 'bg-white' } p-3 w-[200px] text-primary-color rounded-md hover:scale-105`}
          disabled={ isBtnAble }
        >
          Register
        </button>
      </form>
      
      { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black">{ responseMsg }</span> }
    </>
  )
}

export default RegisterForm;


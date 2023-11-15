'use client';

import { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({ loginOption: '', username: '', email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const formFields = ['loginOption', 'password'];

  const checkLoginOption = () => {
    const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
    if (EMAIL_REGEX.test(formData.loginOption)) {
      setFormData({ ...formData, email: formData.loginOption });
    } else {
      setFormData({ ...formData, username: formData.loginOption });
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    checkLoginOption();
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
      { responseMsg.length > 0 && <span className="text-lg italic font-bold text-white">{ responseMsg }</span> }
    </>
  )
}

export default LoginForm;

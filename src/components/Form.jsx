'use client';

import { useEffect, useState } from "react";

function Form({ fields, page, setResponseMsg, handleSubmit }) {
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
    newPassword: '', 
    usernamePassword: ''
  });
  const fieldsToDisplay = {
    email: 'email',
    password: 'password',
    username: 'username',
    confirmPassword: 'confirm password',
    newPassword: 'new passowrd',
    usernamePassword: 'username/password',
  };

  useEffect(() => {
    const formDataDefault = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '', 
      newPassword: '', 
      usernamePassword: ''
  
    };

    if (page === 'login') {
      setIsBtnDisable(false);
    }
    
    setFormData(formDataDefault);
  }, [page]);

  const handleButtonClick = (e) => {
    const FIVE_SECONDS = 5000;
    handleSubmit(e, formData);
    setIsBtnDisable(true);

    setTimeout(() => {
      setIsBtnDisable(false);
    }, FIVE_SECONDS);
  }

  useEffect(() => {
    const handlePasswordSimilarity = () => {
      if (formData.password.length > 0 && formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword) {
        setResponseMsg('');
        setIsBtnDisable(false);
      } else {
        setResponseMsg('Passwords not equal!');
        setIsBtnDisable(true);
      }
    }

    if (page === 'register') {
      handlePasswordSimilarity();
    }

  }, [formData.password, formData.confirmPassword, page, setResponseMsg]);

  return (
    <form
      className={ `flex flex-col items-center justify-around w-full ${ page === 'register' ? 'h-[480px]' : 'h-[380px]' } text-white` }
      onSubmit={ (e) => handleButtonClick(e) }
    >
      { fields.map((field) => (
        <label htmlFor={ `${field}-input` } key={field} className="flex flex-col items-center text-xl font-bold italic uppercase w-[75%]">
          { fieldsToDisplay[field] }

          <input
            id={ `${field}-input` }
            value={ formData[field] }
            type={ field === 'password' || field === 'confirmPassword' ? 'password' : 'text' }
            onChange={ ({ target }) => setFormData({ ...formData, [field]: target.value }) }
            className="mt-2 text-black p-2 rounded-md w-full"
            required={ field === 'email' && page === 'register' ? false : true }
            maxLength={ field.toLowerCase().includes('password') || field === 'username' ? '16' : '30' }
          />

          { field === 'email' && page === 'register' &&
            <span className="text-xs font-bold italic mt-[4px] text-black text-center">You can create a test account without email!</span>
          }
        </label>
      )) }

      <button
        type="submit"
        disabled={ isBtnDisable }
        className={`text-2xl font-extrabold italic ${ isBtnDisable ? 'bg-gray-900' : 'bg-white' } p-3 w-[200px] uppercase text-primary-color rounded-md hover:scale-105`}
      >
        { page }
      </button>
    </form>
  )
}

export default Form;


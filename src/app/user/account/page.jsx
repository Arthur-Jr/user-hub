'use client';

import constants from "@/constants/data";
import { appContext } from "@/context/AppProvider";
import editUser from "@/requests/editUser";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import editImg from '../../../../public/Edit.png';
import loadingImg from '../../../../public/loading-img.svg';

function Account() {
  const defaultFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
    newPassword: '',
  }
  const fieldsToDisplay = {
    email: 'email',
    password: 'password',
    username: 'username',
    confirmPassword: 'confirm password',
    newPassword: 'new passowrd',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [disabledField, setDisabledFields] = useState({ username: true, email: true });
  const [passwordSimilarityMsg, setPasswordSimilarityMsg] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const { userData, setUserData } = useContext(appContext);
  const fields = ['username', 'email', 'newPassword', 'confirmPassword', 'password'];

  useEffect(() => {
    const formDataDefault = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '', 
      newPassword: '',
    };

    setFormData({ ...formDataDefault, username: userData.username, email: userData.email || '' });
  }, [userData]);

  useEffect(() => {
    const handlePasswordSimilarity = () => {
      /* Check if passwords are similar */
      if (formData.newPassword.length > 0 && formData.confirmPassword.length > 0 && formData.newPassword === formData.confirmPassword) {
        setPasswordSimilarityMsg('');
        setIsBtnDisable(false);
      } else {
        setPasswordSimilarityMsg('Passwords not equal!');
        setIsBtnDisable(true);
      }
    }

    if (formData.newPassword.length > 0 || formData.confirmPassword.length > 0) {
      handlePasswordSimilarity();
    } else {
      /* if new passowrd and confirm password is empty submit btn is able because password wont be edited */
      setPasswordSimilarityMsg('');
      setIsBtnDisable(false);
    }
  }, [formData.newPassword, formData.confirmPassword, setPasswordSimilarityMsg]);

  const handleEditEmailBtn = () => {
    if (disabledField.email) {
      setDisabledFields({ ...disabledField, email: false });
    } else {
      setFormData({ ...formData, email: userData.email });
      setDisabledFields({ ...disabledField, email: true });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    setIsLoading(true);
    const editData = { password: formData.password };

    if (formData.email !== userData.email) {
      editData.email = formData.email;
    }

    if (formData.newPassword.length > 0 && formData.confirmPassword.length > 0 && formData.newPassword === formData.confirmPassword) {
      editData.newPassword = formData.newPassword;
    }

    const token = localStorage.getItem(constants.localStorageTokenName);
    const result = await editUser(token, editData);
    if (result.email) {
      setUserData({ ...userData, email: result.email });
      setDisabledFields({ ...disabledField, email: true });
    }

    if (result.status === 201) {
      setFormData({ ...defaultFormData, username: userData.username, email: userData.email });
    }
    
    setIsLoading(false);
    setResponseMsg(result.message);
  }

  return (
    <main className="flex flex-col items-center mb-7">
      <h1 className="text-center text-xl font-bold italic mb-5">Edit Account</h1>
      
      { userData.username.length > 0 && <form className="flex flex-col items-center justify-around w-full h-[600px]" onSubmit={ (e) => handleSubmit(e) }>
        { fields.map((field) => (
          <label
            htmlFor={ `${field}-input` }
            key={field}
            className="flex flex-col md:grid grid-cols-2 items-start text-xl font-bold italic uppercase md:w-[80%] lg:w-[70%] justify-between"
          >
            { fieldsToDisplay[field] }

            <div className="w-[300px] sm:w-[500px] md:w-[390px] lg:w-[500px] flex">
              <input
                id={ `${field}-input` }
                value={ formData[field] }
                name={ `${field}-input` }
                type={ field.toLowerCase().includes('password') ? 'password' : 'text' }
                onChange={ ({ target }) => setFormData({ ...formData, [field]: target.value }) }
                className={ `text-black p-2 rounded-md border-2 border-black w-[85%] disabled:bg-gray-500 disabled:cursor-not-allowed` }
                required={ field === 'password' ? true : false }
                maxLength={ field.toLowerCase().includes('password') || field === 'username' ? '16' : '30' }
                minLength={ field.toLowerCase().includes('password') ? '6' : '3' }
                disabled={ disabledField[field] }
              />

              { field === 'email' &&
                  <button
                  type="button"
                  onClick={ () => handleEditEmailBtn() }
                  disabled={ userData.status === 0 }
                  className="border-2 border-black rounded-md hover:scale-105 ml-1 w-[45px] flex items-center justify-center text-red-700 text-2xl disabled:cursor-not-allowed"
                  title={ userData.status === 0 ? 'Test accounts can\'t edit email!' : 'Edit email!' }
                >
                  { disabledField.email ? <Image src={ editImg } alt="loading" width={25} height={25} /> : 'X' }
                </button>
              }
            </div>

            { passwordSimilarityMsg.length === 0 && field === 'confirmPassword' &&
              <span className="text-lg italic font-bold text-center mt-1 text-red-700 col-span-1 col-start-2">{ "passwordSimilarityMsg" }</span>
            }
          </label>
        ))}

        <button
          type="submit"
          disabled={ isBtnDisable }
          className={`text-2xl font-extrabold italic border-2 border-black p-3 w-[200px] uppercase text-primary-color rounded-md hover:scale-105 `}
        >
          Send
        </button>
      </form> }
      
      { isLoading && <div className="flex items-center"><Image src={ loadingImg } alt="loading" width={40} height={40} /></div> }
      { responseMsg.length > 0 && <span className="text-lg italic font-bold text-green-700 text-center">{ responseMsg }</span> }
    </main>
  )
}

export default Account;

'use client';

import { FormButton } from '@/components/Form/FormButton';
import { FormField } from '@/components/Form/FormField';
import { FormInput } from '@/components/Form/FormInput';
import { FormLabel } from '@/components/Form/FormLabel';
import Image from "next/image";
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import editImg from '../../public/Edit.png';

export default function AccountForm({ editUser, userData }) {
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const methods = useForm({ defaultValues: { username: userData.username, email: userData.email } });

  const fieldsCss = 'flex flex-col md:grid grid-cols-2 items-start justify-between w-[300px] md:w-[80%] lg:w-[70%]';
  const inputCss = 'text-black font-semibold text-base italic p-2 rounded-md w-full border-2 border-black disabled:bg-gray-500 disabled:cursor-not-allowed';
  const emailBtnCss = 'border-2 border-black rounded-md hover:scale-105 ml-1 w-[45px] h-[42px] flex items-center justify-center text-red-700 text-2xl disabled:cursor-not-allowed';
  const labelCss = 'flex flex-col items-start text-xl font-bold italic uppercase w-[75%] text-center';

  const handleEditEmailBtn = () => {
    if (isEmailDisabled) {
      setIsEmailDisabled(false); 
    } else {
      setIsEmailDisabled(true);
      methods.reset({ email: 'test' });
    }
  }

  return (
    <>
      <FormProvider { ...methods }>
        <form
          className="flex flex-col items-center justify-around w-full h-[600px] md:h-[480px] gap-4"
          onSubmit={ methods.handleSubmit(editUser) }
        >
          <FormField className={ fieldsCss }>
            <FormLabel className={ labelCss } htmlFor="username">username</FormLabel>
            <FormInput type="text" name="username" minLength="3" maxLength="10" disabled className={ inputCss }/>
          </FormField>

          <FormField className={ fieldsCss }>
            <FormLabel className={ labelCss } htmlFor="email">email</FormLabel>

            <div className="flex items-center w-full">
              <FormInput type="text" name="email" minLength="6" maxLength="30" disabled={ isEmailDisabled } className={ inputCss }/>

              <FormButton type="button" className={ emailBtnCss } onClick={ () => handleEditEmailBtn() }>
                <Image src={ editImg } alt="Enable edit email button" width={25} height={25}/>
              </FormButton>
            </div>
          </FormField>

          <FormField className={ fieldsCss }>
            <FormLabel className={ labelCss } htmlFor="newPassword">new password</FormLabel>
            <FormInput type="password" name="newPassword" minLength="6" maxLength="16"/>
          </FormField>

          <FormField className={ fieldsCss }>
            <FormLabel className={ labelCss } htmlFor="confirmPassword">confirm password</FormLabel>
            <FormInput type="password" name="confirmPassword" minLength="6" maxLength="16"/>
          </FormField>

          <FormField className={ fieldsCss }>
            <FormLabel className={ labelCss } htmlFor="password">password</FormLabel>
            <FormInput type="password" name="password" required minLength="6" maxLength="16"/>
          </FormField>

          <FormButton type="submit">
            Send
          </FormButton>
        </form>
      </FormProvider>
    </>
  )
};

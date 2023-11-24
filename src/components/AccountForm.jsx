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

  const fieldsCss = 'md:grid grid-cols-2 items-start w-[300px] md:w-[80%] lg:w-[70%]';
  const inputCss = 'font-semibold text-base w-full disabled:bg-gray-500 disabled:cursor-not-allowed';
  const labelCss = 'items-start w-[75%]';

  const handleEditEmailBtn = () => {
    if (isEmailDisabled) {
      setIsEmailDisabled(false); 
    } else {
      setIsEmailDisabled(true);
      methods.reset({ email: userData.email });
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

              <FormButton
                type="button"
                onClick={ () => handleEditEmailBtn() }
                className="ml-1 w-[45px] h-[43px] text-red-700 text-xl p-1 mt-2 flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={ !userData.status }
                title={ isEmailDisabled ? 'Edit email' : 'Cancel email edit' }
              >
                { isEmailDisabled ? 
                  <Image src={ editImg } alt="Enable edit email button" width={25} height={25}/> :
                  'X'
                }
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

'use client';

import { FormButton } from '@/components/Form/FormButton';
import { FormField } from '@/components/Form/FormField';
import { FormInput } from '@/components/Form/FormInput';
import { FormLabel } from '@/components/Form/FormLabel';
import { FormMessage } from '@/components/Form/FormMessage';
import { FormProvider, useForm } from 'react-hook-form';

export default function RegisterForm({ registerUser }) {
  const methods = useForm();

  return (
    <>
      <FormProvider { ...methods }>
        <form
          className="flex flex-col items-center justify-around w-full h-[480px]"
          onSubmit={ methods.handleSubmit(registerUser) }
        >
          <FormField>
            <FormLabel className="text-base sm:text-lg" htmlFor="username">username</FormLabel>
            <FormInput className="p-2" type="text" name="username" required minLength="3" maxLength="10"/>
          </FormField>

          <FormField>
            <FormLabel className="text-base sm:text-lg" htmlFor="email">email</FormLabel>
            <FormInput className="p-2" type="text" name="email" minLength="6" maxLength="30"/>
            <FormMessage message="You can create a test account without email!"/>
          </FormField>

          <FormField>
            <FormLabel className="text-base sm:text-lg" htmlFor="password">password</FormLabel>
            <FormInput className="p-2" type="password" name="password" required minLength="6" maxLength="16"/>
          </FormField>

          <FormField>
            <FormLabel className="text-base sm:text-lg" htmlFor="confirmPassword">confirm password</FormLabel>
            <FormInput className="p-2" type="password" name="confirmPassword" required minLength="6" maxLength="16"/>
          </FormField>

          <FormButton type="submit" className="p-2 text-lg sm:text-2xl">
            Register
          </FormButton>
        </form>
      </FormProvider>
    </>
  )
};

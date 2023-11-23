'use client';

import { FormButton } from '@/components/Form/FormButton';
import { FormField } from '@/components/Form/FormField';
import { FormInput } from '@/components/Form/FormInput';
import { FormLabel } from '@/components/Form/FormLabel';
import { FormProvider, useForm } from 'react-hook-form';

export default function LoginForm({ login }) {
  const methods = useForm();

  return (
    <>
      <FormProvider { ...methods }>
        <form
          className="flex flex-col items-center justify-around w-full h-[330px]"
          onSubmit={ methods.handleSubmit(login) }
        >
          <FormField>
            <FormLabel htmlFor="usernameEmail">username/email</FormLabel>
            <FormInput type="text" name="usernameEmail" required minLength="3" maxLength="30"/>
          </FormField>

          <FormField>
            <FormLabel htmlFor="password">password</FormLabel>
            <FormInput type="password" name="password" required minLength="6" maxLength="16"/>
          </FormField>

          <FormButton type="submit">
            Login
          </FormButton>
        </form>
      </FormProvider>
    </>
  )
};

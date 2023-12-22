'use client';

import { FormButton } from '@/components/Form/FormButton';
import { FormField } from '@/components/Form/FormField';
import { FormInput } from '@/components/Form/FormInput';
import { FormLabel } from '@/components/Form/FormLabel';
import endpoints from '@/constants/endpoints';
import handlePasswordSimilarity from '@/globalFuncs/passwordSimilarity';
import getUserData from '@/requests/getUserData';
import logout from '@/requests/logout';
import resetPassword from '@/requests/resetPassword';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

function ResetPassword({ params: { token } }) {
  const [responseMsg, setResponseMsg] = useState('');
  const [isBtnDisable, setIsBtnDisabled] = useState(false);
  const router = useRouter();
  const methods = useForm();

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        router.push(endpoints.home);
        return;
      }
  
      const { data } = jwtDecode(token);
      if (!data.reset) {
        router.push(endpoints.home);
        return;
      }
    }

    checkToken();
  }, [router, token]);

  const resetPass = async (userData) => {
    setResponseMsg('');

    if (!handlePasswordSimilarity(userData)) {
      setResponseMsg('Passwords not equal!');
      return;
    }

    const result = await resetPassword(token, userData);

    if (result.status === 204) {
      setResponseMsg(result.message);
      setIsBtnDisabled(true);

      setTimeout(() => {
        router.push(endpoints.home);
      }, 6000);
    }

    if (result.status === 500) {
      setResponseMsg(result.message);
    }

    if (result.status === 401) {
      setResponseMsg('Invalid Access!');
      setIsBtnDisabled(true);

      setTimeout(() => {
        router.push(endpoints.home);
      }, 6000);
    }
  }

  return (
    <main className="flex flex-col items-center w-full py-10">
      <h1 className="text-center text-3xl font-bold italic mb-5">Reset Password</h1>

      <div className="flex flex-col items-center w-full sm:w-[600px] h-[550px]">

        <FormProvider { ...methods }>
          <form className="flex flex-col items-center justify-around w-full h-80 gap-3 px-10" onSubmit={ methods.handleSubmit(resetPass) }>
            <FormField>
              <FormLabel htmlFor="password">password</FormLabel>
              <FormInput type="password" name="password" required minLength="6" maxLength="16"/>
            </FormField>

            <FormField>
              <FormLabel htmlFor="confirmPassword">confirm password</FormLabel>
              <FormInput type="password" name="confirmPassword" required minLength="6" maxLength="16"/>
            </FormField>

            <FormButton type="submit" disabled={ isBtnDisable }>
              Send
            </FormButton>
          </form>
        </FormProvider>

        { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
      </div>
    </main>
  )
}

export default ResetPassword;;

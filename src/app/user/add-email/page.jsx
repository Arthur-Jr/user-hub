'use client';

import { FormButton } from '@/components/Form/FormButton';
import { FormField } from '@/components/Form/FormField';
import { FormInput } from '@/components/Form/FormInput';
import { FormLabel } from '@/components/Form/FormLabel';
import endpoints from '@/constants/endpoints';
import { appContext } from '@/context/AppProvider';
import addEmail from '@/requests/addEmail';
import { HttpStatusCode } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import loadingImg from '../../../../public/loading-img.svg';

function AddEmail() {
  const [responseMsg, setResponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useContext(appContext);
  const router = useRouter();
  const methods = useForm();

  useEffect(() => {
    if (userData.username && userData.status !== 0) {
      router.push(endpoints.projects);
    }
  }, [router, userData]);

  const addNewEmail = async (newData) => {
    setResponseMsg('');
    setIsLoading(true);
    const result = await addEmail(newData);
    setIsLoading(false);

    if (result.status === HttpStatusCode.Ok) {
      setUserData({ ...userData, status: 1, email: newData.email });
      router.push(endpoints.projects);
    } else {
      setResponseMsg(result.data.message);
    }
  }

  return (
    <main className="w-full flex flex-col items-center h-96">
      { userData.username.length > 0 &&
        <div className="w-full sm:w-[650px] flex flex-col items-center">
          <h1 className="text-center text-xl font-bold italic mb-5">Add an email to your test account!</h1>

          <FormProvider { ...methods }>
            <form className="flex flex-col items-center justify-around w-full gap-8 p-10" onSubmit={ methods.handleSubmit(addNewEmail) }>
              <FormField>
                <FormLabel htmlFor="email">email</FormLabel>
                <FormInput type="text" name="email" minLength="6" maxLength="30" required/>
              </FormField>

              <FormField>
                <FormLabel htmlFor="password">password</FormLabel>
                <FormInput type="password" name="password" required minLength="6" maxLength="16"/>
              </FormField>

              <FormButton type="submit" disabled={ isLoading }>
                Add Email
              </FormButton>
            </form>
          </FormProvider>

          { isLoading && 
            <div className="flex items-center">
              <Image src={ loadingImg } alt="loading" className="rounded-full" width={55} height={55} />
            </div> 
          }

          { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
        </div>
      }
    </main>
  )
}

export default AddEmail;

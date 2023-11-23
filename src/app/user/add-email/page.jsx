'use client';

import { FormButton } from "@/components/Form/FormButton";
import { FormField } from "@/components/Form/FormField";
import { FormInput } from "@/components/Form/FormInput";
import { FormLabel } from "@/components/Form/FormLabel";
import constants from "@/constants/data";
import endpoints from "@/constants/endpoints";
import { appContext } from "@/context/AppProvider";
import addEmail from "@/requests/addEmail";
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';

function AddEmail() {
  const [responseMsg, setResponseMsg] = useState('');
  const { userData } = useContext(appContext);
  const router = useRouter();
  const methods = useForm();

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorageTokenName);
    let userData;

    if (token) {
      const { data } = jwtDecode(token);
      userData = data;
    }

    if (token && userData.status !== 0) {
      router.push(endpoints.projects);
    }
  }, [router]);

  const addNewEmail = async (userData) => {
    const token = localStorage.getItem(constants.localStorageTokenName);
    const result = await addEmail(token, userData);

    if (result.token) {
      localStorage.setItem(constants.localStorageTokenName, result.token);
      router.push(endpoints.projects);
    } else {
      setResponseMsg(result.message);
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

              <FormButton type="submit">
                Add Email
              </FormButton>
            </form>
          </FormProvider>

          { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
        </div>
      }
    </main>
  )
}

export default AddEmail;

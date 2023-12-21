'use client';

import { AccountForm } from '@/components';
import { appContext } from '@/context/AppProvider';
import editUser from '@/requests/editUser';
import Image from 'next/image';
import { useContext, useState } from 'react';
import loadingImg from '../../../../public/loading-img.svg';

function Account() {
  const [responseMsg, setResponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useContext(appContext);

  const handleSubmit = async (data) => {
    setResponseMsg('');
    const editData = { password: data.password };

    if (data.email.length > 0 && data.email !== userData.email) {
      editData.email = data.email;
    }

    if (data.newPassword.length > 0 && data.confirmPassword.length > 0 && data.newPassword === data.confirmPassword) {
      editData.newPassword = data.newPassword;
    } else if (data.newPassword.length > 0 && data.confirmPassword.length > 0) {
      setResponseMsg('Passwords not equal!');
      return;
    }

    setIsLoading(true);
    const result = await editUser(editData);
    if (result.email) {
      setUserData({ ...userData, email: result.email });
    }
    
    setIsLoading(false);
    setResponseMsg(result.message);
  }

  return (
    <main className="flex flex-col items-center mb-7">
      <h1 className="text-center text-xl font-bold italic mb-5">Account Management</h1>

      { userData.username.length > 0 && <AccountForm editUser={ handleSubmit } userData={ userData } /> }
      
      { isLoading && 
        <div className="flex items-center">
          <Image src={ loadingImg } alt="loading" width={40} height={40} />
        </div> 
      }
      { responseMsg.length > 0 && <span className="text-lg italic font-bold text-black text-center">{ responseMsg }</span> }
    </main>
  )
}

export default Account;

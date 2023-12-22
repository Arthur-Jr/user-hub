'use client';

import startServer from '@/requests/startServer';
import { createContext, useEffect, useState } from 'react';

export const appContext = createContext();

function AppProvider({ children }) {
  const [userData, setUserData] = useState({ username: '', email: '', status: '' });

  useEffect(() => {
    startServer();
  }, []);

  return (
    <appContext.Provider value={{ userData, setUserData }}>
      {children}
    </appContext.Provider>
  );
}

export default AppProvider;
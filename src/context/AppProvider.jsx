'use client';

import { createContext, useState } from 'react';

export const appContext = createContext();

function AppProvider({ children }) {
  const [userData, setUserData] = useState({ username: '', email: '', status: '' });

  return (
    <appContext.Provider value={{ userData, setUserData }}>
      {children}
    </appContext.Provider>
  );
}

export default AppProvider;
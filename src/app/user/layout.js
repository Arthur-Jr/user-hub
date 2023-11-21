import { Header } from '@/components';
import AppProvider from '@/context/AppProvider';

export default function UserLayout({ children }) {
  return (
    <AppProvider>
      <Header />
      {children}
    </AppProvider>
  )
};

import { Header } from '@/components';

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
};

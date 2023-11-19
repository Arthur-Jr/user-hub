import endpoints from '@/constants/endpoints';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(endpoints.home);
}

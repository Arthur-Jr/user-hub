import endpoints from '@/constants/endpoints';
import Link from 'next/link';

function TestUserMessage() {
  return (
    <div className="flex justify-center text-center w-full bg-red-500 p-4">
      <span className="text-xl font-bold italic">
        Your account is a test account, <Link className="underline underline-offset-2 hover:text-white" href={ endpoints.addEmail }>Register an email</Link> to keep this account!
      </span>
    </div>
  )
}

export default TestUserMessage

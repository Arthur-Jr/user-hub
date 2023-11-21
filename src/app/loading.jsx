import Image from 'next/image';
import loadingImg from '../../public/loading-img.svg';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[100%] h-[100vh] w-full absolute z-10 bg-gray-300">
      <Image src={ loadingImg } alt="loading" width={180} height={180}/>
    </div>
  )
}

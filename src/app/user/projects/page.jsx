import Image from 'next/image';
import Link from 'next/link';
import schedule from '../../../../public/projects/schedule.png';

function Projects() {
  return (
    <main className="flex flex-col gap-10 px-10">
      <section className="px-10 w-full">
        <h2 className="text-center text-xl font-semibold italic">Projects that can be accessed with this account</h2>
      </section>

      <section className="w-full h-24">
        <div className="flex flex-col items-center gap-2 w-64">
          <Link href="https://schedule-arthur-jr.vercel.app" target="_blank" className="hover:scale-105">
            <Image src={ schedule } width={ 250 } height={ 250 } alt='Schedule project image' className="rounded-lg" />
          </Link>
          <span className="text-xl italic font-semibold">Schedule</span>
        </div>
      </section>
    </main>
  )
}

export default Projects;

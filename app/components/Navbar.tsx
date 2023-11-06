import Link from 'next/link';
import ThemeButton from './ThemeButton';

export default function Navbar() {
  return (
    <div className='rounded-full backdrop-blur bg-neutral-400/20 dark:bg-neutral-900/50  dark:border-white border-neutral-400 border-2 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl'>
      <div className='flex justify-between h-16'>
        <div className='flex items-center justify-between w-full text-2xl'>
          <Link href='/'>
            Ansh Roshan&apos;s <span className='text-sky-600 dark:text-sky-400'>Blog</span>
          </Link>
          <div className='flex items-center gap-4'>
            <Link href='/about'>About</Link>
            <Link href='/studio'>Sanity</Link>
            <ThemeButton />
          </div>
        </div>
      </div>
    </div>
  );
}

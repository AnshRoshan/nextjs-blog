import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

const Navbar = () => {
  return (
    <div className='mt-2 bg-violet-300/70 dark:bg-violet-300/10 sticky top-1 z-10 rounded-full backdrop-blur border dark:border-white border-violet-400 mx-auto px-4 sm:px-6 lg:px-8 lg:w-4/5 xl:w-3/4 flex justify-between py-2'>
      <div className='flex items-center justify-between w-full text-3xl tracking-tight font-semibold'>
        <Link href='/'>
          Ansh Roshan&apos;s <span className='text-sky-600 dark:text-sky-400'>Blog</span>
        </Link>
        <div className='flex items-center gap-4'>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

export default Navbar

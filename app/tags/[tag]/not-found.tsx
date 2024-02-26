import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <p className='mt-10 text-5xl'>Sorry, the requested post does not exist.</p>
      <div className='mt-4'>
        Back to{' '}
        <Link
          href='/'
          className={`${buttonVariants({
            variant: 'outline',
          })}p-1 px-4 mx-4 rounded text-lg lowercase `}
        >
          Home 🏠
        </Link>
      </div>
    </div>
  )
}

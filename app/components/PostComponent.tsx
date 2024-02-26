import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import getFormattedDate from '@/lib/getFormattedDate'
import Link from 'next/link'
const cardStyle = `
p-4 my-8 w-full border-2 dark:border-white border-outset border-neutral-900 rounded-xl shadow-lg shadow-purple-950 hover:bg-black/10 hover:dark:bg-white/10 h-48 flex flex-col justify-between relative
`

const PostComponent = ({ post }: any) => {
  return (
    <Card className={` ${cardStyle} `}>
      <Link href={`/posts/${post.id}`} prefetch className='flex flex-col flex-grow'>
        <div className='flex flex-col lg:flex-row gap-2 justify-between items-center'>
          <CardTitle>{post.title}</CardTitle>
          <p className='text-sky-600 dark:text-sky-400 text-base font-bold  '>
            {getFormattedDate(post.date)}
          </p>
        </div>
        <CardDescription className='flex-grow'>{post.description}</CardDescription>
      </Link>
      <div className='flex flex-col lg:flex-row items-center justify-between text-sky-600 dark:text-sky-400 text-base font-bold  '>
        <div className=''>
          {post?.tags?.map((tag: any) => (
            <Link
              key={tag?._id}
              href={`/tags/${tag}`}
              className={`${buttonVariants({
                variant: 'outline',
              })}p-1 px-4 mr-4 rounded text-lg lowercase `}
            >
              # {tag}
            </Link>
          ))}
        </div>
        <p>🧑 {post?.author}</p>
      </div>
    </Card>
  )
}

export default PostComponent

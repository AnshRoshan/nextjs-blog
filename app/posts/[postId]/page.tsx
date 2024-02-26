import getFormattedDate from '@/lib/getFormattedDate'
import { getPostsMeta, getPostByName } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'
import { buttonVariants } from '@/components/ui/button'
// per-page revalidation in seconds -- 24 hours
export const revalidate = 86400
// export const revalidate = 30

type Props = {
  params: {
    postId: string
  }
}

export async function generateStaticParams() {
  //deduped! -- getPostsMeta() is called once
  const posts = await getPostsMeta()
  if (!posts) return []
  return posts.map((post) => ({
    postId: post.id,
  }))
}

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`) //deduped!

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.meta.title,
  }
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`) //deduped!

  if (!post) notFound()

  const { meta, content } = post

  const pubDate = getFormattedDate(meta.date)

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ))

  return (
    <>
      <h2 className='text-5xl font-bold text-center mt-4 mb-0'>{meta.title}</h2>
      <p className='mt-0 text-lg text-center'>{pubDate}</p>
      <article className='server-code mt-8 mb-16 rounded-3xl bg-slate-300 dark:bg-neutral-800  p-8'>
        {content}
      </article>
      <section className='text-2xl m-4 flex justify-center items-center gap-4 '>
        <div>Related:</div>
        <div className='flex flex-row gap-4  text-center underline'>{tags}</div>
      </section>
      <p className='mb-10 p-4 mx-auto text-center '>
        <Link
          href='/'
          className={`${buttonVariants({
            variant: 'outline',
          })}p-1 px-4 mx-4 rounded text-lg lowercase `}
        >
          ← Back to Home 🏠
        </Link>
      </p>
    </>
  )
}

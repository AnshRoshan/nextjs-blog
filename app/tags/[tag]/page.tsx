import PostComponent from '@/components/Custom/PostComponent'
import { getPostsMeta } from '@/lib/posts'
import Link from 'next/link'

export const revalidate = 86400
// export const revalidate = 10

type Props = {
	params: {
		tag: string
	}
}

export async function generateStaticParams() {
	const posts = await getPostsMeta() //deduped!

	if (!posts) return []

	const tags = new Set(posts.map((post) => post.tags).flat())

	return Array.from(tags).map((tag) => ({ tag }))
}

export function generateMetadata({ params: { tag } }: Props) {
	return {
		title: `Posts about ${tag}`,
	}
}

export default async function TagPostList({ params: { tag } }: Props) {
	const posts = await getPostsMeta() //deduped!

	if (!posts) return <p className='mt-10 text-center'>Sorry, no posts available.</p>

	const tagPosts = posts.filter((post) => post.tags.includes(tag))

	if (!tagPosts.length) {
		return (
			<div className='text-center'>
				<p className='mt-10'>Sorry, no posts for that keyword.</p>
				<Link href='/'>Back to Home</Link>
			</div>
		)
	}

	return (
		<>
			<header className='py-8 mb-12 border-b-4 dark:border-purple-900'>
				<h1 className='text-5xl leading-8 tracking-tight font-extrabold dark:text-gray-100 '>
					Results for: #{tag} ({tagPosts.length})
				</h1>
			</header>
			<section className='mt-6 mx-auto '>
				<ul className='w-full list-none p-0'>
					{tagPosts.map((post) => (
						<PostComponent key={post.id} post={post} />
					))}
				</ul>
			</section>
		</>
	)
}

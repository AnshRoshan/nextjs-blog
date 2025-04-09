import Posts from '../components/Custom/Posts'

export const revalidate = 86400
// export const revalidate = 10

// %  @ts-expect-error Server Component
export default function Home() {
	return (
		<div className='mx-auto'>
			<Posts />
		</div>
	)
}

import { getPostsMeta } from "@/lib/posts";
import PostComponent from "./PostComponent";

export default async function Posts() {
	const posts = await getPostsMeta();
	console.log(`${JSON.stringify(posts)}----------- posts conpoments`);
	if (!posts) {
		return <p className="mt-10 text-center">Sorry, no posts available.</p>;
	}

	return (
		<div className="">
			<header className="py-8 mb-12 border-b-4 dark:border-purple-900">
				<h1 className="text-5xl leading-8 tracking-tight font-extrabold dark:text-gray-100 ">
					Latest Posts - ({posts.length})
				</h1>
			</header>
			<section className="mt-6 mx-auto">
				<ul className="w-full list-none p-0">
					{posts.map((post) => (
						<PostComponent key={post.id} post={post} />
					))}
				</ul>
			</section>
		</div>
	);
}

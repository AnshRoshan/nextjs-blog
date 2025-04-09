import CustomImage from '@/components/Custom/CustomImage';
import Video from '@/components/Custom/Video';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

type Filetree = {
	tree: Array<{
		path: string;
	}>;
};

type Frontmatter = {
	title: string;
	date: string;
	tags: string[];
	description: string;
	author: string;
};

type BlogPost = {
	meta: {
		id: string;
		title: string;
		date: string;
		tags: string[];
		description: string;
		author: string;
	};
	content: string;
};

type Meta = BlogPost['meta'];

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_REPO_URL = 'https://raw.githubusercontent.com/Anshroshan/Blogs/main';

async function fetchFromGitHub(url: string): Promise<Response> {
	return fetch(url, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			'X-GitHub-Api-Version': '2022-11-28',
		},
	});
}

async function fetchMDXContent(fileName: string): Promise<string | undefined> {
	const res = await fetchFromGitHub(`${GITHUB_REPO_URL}/${fileName}`);
	if (!res.ok) return undefined;

	const rawMDX = await res.text();
	return rawMDX === '404: Not Found' ? undefined : rawMDX;
}

async function compileMDXContent(rawMDX: string): Promise<{ frontmatter: Frontmatter; content: any }> {
	const { frontmatter, content } = await compileMDX<Frontmatter>({
		source: rawMDX,
		components: {
			Video,
			CustomImage,
		},
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				rehypePlugins: [
					rehypeHighlight,
					rehypeSlug,
					[
						rehypeAutolinkHeadings,
						{
							behavior: 'wrap',
						},
					],
				],
			},
		},
	});

	return { frontmatter, content };
}

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
	try {
		const rawMDX = await fetchMDXContent(fileName);
		if (!rawMDX) return undefined;

		const { frontmatter, content } = await compileMDXContent(rawMDX);

		const id = fileName.replace(/\.mdx$/, '');

		return {
			meta: {
				id,
				title: frontmatter.title,
				date: frontmatter.date,
				tags: frontmatter.tags,
				description: frontmatter.description,
				author: frontmatter.author,
			},
			content,
		};
	} catch (error) {
		console.error(`Error fetching post by name: ${fileName}`, error);
		return undefined;
	}
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
	try {
		const res = await fetchFromGitHub(`${GITHUB_API_URL}/repos/Anshroshan/Blogs/git/trees/main?recursive=1`);
		if (!res.ok) return undefined;

		const repoFiletree: Filetree = await res.json();
		const filesArray = repoFiletree.tree
			.map((obj) => obj.path)
			.filter((path) => path.endsWith('.mdx'));

		const posts: Meta[] = [];

		for (const file of filesArray) {
			const post = await getPostByName(file);
			if (post) {
				posts.push(post.meta);
			}
		}

		return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
	} catch (error) {
		console.error('Error fetching posts metadata', error);
		return undefined;
	}
}
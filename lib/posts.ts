import CustomImage from '@/app/components/CustomImage'
import Video from '@/app/components/Video'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'

type Filetree = {
  tree: [
    {
      path: string
    }
  ]
}

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
  const res = await fetch(`https://raw.githubusercontent.com/Anshroshan/Blogs/main/${fileName}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!res.ok) return undefined

  const rawMDX = await res.text()

  if (rawMDX === '404: Not Found') return undefined

  // the type of frontmatter is inferred from the frontmatter of the mdx file
  const { frontmatter, content } = await compileMDX<{
    title: string
    date: string
    tags: string[]
  }>({
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
  })

  const id = fileName.replace(/\.mdx$/, '')

  // the type of blogPostObj is inferred from the frontmatter and content of the mdx file
  const blogPostObj: BlogPost = {
    meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags },
    content,
  }

  return blogPostObj
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const res = await fetch(
    'https://api.github.com/repos/Anshroshan/Blogs/git/trees/main?recursive=1',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )

  if (!res.ok) return undefined

  const repoFiletree: Filetree = await res.json()

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith('.mdx'))

  const posts: Meta[] = []

  // for of loop awaits so use it instead of for each
  for (const file of filesArray) {
    const post = await getPostByName(file)
    if (post) {
      const { meta } = post
      posts.push(meta)
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

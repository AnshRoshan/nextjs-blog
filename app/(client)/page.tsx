import { client } from '@/sanity/lib/client';
import Header from '../components/Header';
import { Post } from '../utils/interface';
import PostComponent from '../components/PostComponent';

async function getPosts() {
  const query = `
  *[_type == "post"] {
    title,
    slug,
    publishedAt,
    tags[]-> {
      _id,
      slug,
      name
    },
    _id,
    mainImage,
    _createdAt,
    _updatedAt,
    overview
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 3600;

export default async function Home() {
  const posts: Post[] = (await getPosts()) as Post[];
  return (
    <div>
      <Header title={`All Articles (${posts.length})`} tags />
      <div>{posts?.length > 0 && posts?.map(post => <PostComponent key={post?._id} post={post} />)}</div>
    </div>
  );
}

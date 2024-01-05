import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { Post } from '@/sanity/lib/interface';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 900;
async function getData() {
  const query = '*[_type == "post"]{title, overview,...}';
  const data = await client.fetch(query);
  return data;
}

export default async function Index() {
  const data = (await getData()) as Post[];
  return (
    <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl'>
      <div className='space-y-2 py-6 md:space-y-6 '>
        <h1 className='text-3xl leading-8 tracking-tight font-extrabold text-black dark:text-gray-100 '>
          All Posts ({data.length})
        </h1>
      </div>
      <ul>
        {data.map(post => (
          <li key={post._id}>
            <Card className='p-4 mb-4 max-h-64'>
              <Link href={`/post/${post.slug.current}`} prefetch className={`space-y-3 xl:col-span-3 `}>
                <CardTitle>{post.title}</CardTitle>
                <div className='flex p-4'>
                  <CardDescription>{post.overview}</CardDescription>

                  {post.mainImage && (
                    <Image
                      src={urlForImage(post.mainImage).url() as string}
                      alt={post.mainImage.alt || 'No Image'}
                      width={180}
                      height={90}
                      className='ml-6 border-gray-300  border-4 dark:border-white rounded-lg'
                    />
                  )}
                </div>
                <div className='flex flex-row justify-between text-sky-600 dark:text-sky-400 text-base font-bold leading-6 '>
                  <p>{new Date(post._createdAt).toISOString().split('T')[0]}</p>
                  <p>
                    {new Date(post._updatedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </p>
                </div>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { Post } from '@/sanity/lib/interface';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export const revalidate = 900;

async function getData(slug: string) {
  const query = `*[_type == "post" && slug.current =="${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const data = (await getData(params.slug)) as Post;
  const portabletextcomponents = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image src={urlForImage(value).url() as string} alt={value.alt} width={800} height={400} className='mx-auto ' />
      ),
    },
  };

  return (
    <>
      <div className='xl:divide-y xl:divide-gray-200 Ixl:dark:divide-gray-700'>
        <header className='pt-6 xl:pb-6'>
          <div className='space-y-1 text-center'>
            <div className='space-y-10'>
              <div>
                <p className='text-base font-medium leading-6 text-sky-600 dark:text-sky-400'>
                  <time dateTime={data.publishedAt}>
                    {new Date(data._updatedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </time>
                </p>
              </div>
            </div>
            <div>
              <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
                {data.title}
              </h1>
            </div>
          </div>
        </header>
        <div className='divide-y divide-gray-200 pb-7 Idark:divide-gray-700 xl:divide-y-0'>
          <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
            <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-8 pt-10 dark:prose-invert prose-lg '>
              <PortableText value={data.body} components={portabletextcomponents} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

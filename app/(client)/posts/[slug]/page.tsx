import Header from '@/app/components/Header';
import { Post } from '@/app/utils/interface';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';

interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    _id,
    body,
    tags[]-> {
      _id,
      slug,
      name
    }
  }
  `;

  const post = await client.fetch(query);
  return post;
}

export const revalidate = 3600;

const page = async ({ params }: Params) => {
  // console.log(params, "parmas");
  const post: Post = await getPost(params?.slug);
  // console.log(post, "post");

  if (!post) {
    notFound();
  }
  const myPortableTextComponents = {
    types: {
      image: ({ value }: any) => <Image src={urlForImage(value).url()} alt='Post' width={700} height={700} />,
    },
  };

  return (
    <div>
      <Header title={post?.title} />

      <div className='flex flex-col lg:flex-row gap-2 justify-between  items-center p-4'>
        <span className={`text-purple-500`}>{new Date(post?.publishedAt).toDateString()}</span>
        <div className='mt-5'>
          {post?.tags?.map(tag => (
            <Link
              key={tag?._id}
              href={`/tag/${tag.slug.current}`}
              className={`${buttonVariants({ variant: 'outline' })} mr-2 p-2 rounded-sm text-sm lowercase border`}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
      {post?.mainImage && (
        <Image
          src={urlForImage(post?.mainImage).url() as string}
          alt={post?.mainImage.alt || 'No Image'}
          width={900}
          height={300}
          className='mx-auto border-gray-300  border-4 dark:border-white rounded-lg'
        />
      )}
      <div className='px-4  mt-8 prose-headings:my-5 prose-heading:text-2xl  prose-p:mb-5 prose-p:leading-7 prose-li:list-disc prose-li:leading-7 prose-li:ml-4'>
        <PortableText value={post?.body} components={myPortableTextComponents} />
      </div>
    </div>
  );
};

export default page;

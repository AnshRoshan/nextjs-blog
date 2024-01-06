import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../utils/interface';
import { buttonVariants } from '@/components/ui/button';

interface Props {
  post: Post;
}

const PostComponent = ({ post }: Props) => {
  return (
    <Card className='p-4 mb-4'>
      <Link href={`/posts/${post?.slug?.current}`} prefetch className={`space-y-3 xl:col-span-3 `}>
        <div className='flex flex-col lg:flex-row gap-2 justify-between items-center'>
          {' '}
          <CardTitle>{post.title}</CardTitle>
          <p className=' text-sky-600 dark:text-sky-400 text-base font-bold  '>
            {new Date(post._createdAt).toISOString().split('T')[0]}
          </p>
        </div>
        <div className='flex flex-col lg:flex-row gap-2 justify-between  items-center p-4 '>
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
        <div className='flex flex-col lg:flex-row gap-2 justify-between  items-center text-sky-600 dark:text-sky-400 text-base font-bold  '>
          {/* TAGS */}

          <div>
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
  );
};

export default PostComponent;

const cardStyle = `
mb-8
p-4
border
border-gray-900
rounded-md
shadow-sm
shadow-purple-950
hover:shadow-md
hover:bg-purple-500
hover:text-white
hover:dark:bg-gray-950
`;

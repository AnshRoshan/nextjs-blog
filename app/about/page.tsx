// pages/about/page.tsx

export default function AboutPage() {
  return (
    <div className='m-16 mx-auto p-8  bg-blend-lighten bg-gray-700/20 rounded-full shadow-xl h-[600px] w-[600px] flex flex-col justify-center items-center divide '>
      <h1 className='text-5xl font-bold text-gray-900  dark:text-gray-200 mb-16 '>About Us</h1>
      <p className=' prose text-gray-800 text-2xl  dark:text-gray-300'>
        Welcome to my Blog website. A collection of my thoughts, ideas, and experiences. I am a student and a
        self-taught developer. I am currently learning Next.js and Tailwind CSS. I am also learning about Sanity.io.
      </p>
      <p className='mt-16 text-md prose text-gray-800 dark:text-gray-300'>Created By -@anshroshan</p>
    </div>
  );
}

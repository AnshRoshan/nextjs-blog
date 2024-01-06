import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = '', tags = false }: Props) => {
  return (
    <header className='pt-16 p-4 mb-12 border-b-4  dark:border-purple-900'>
      <h1 className='text-3xl leading-8 tracking-tight font-extrabold dark:text-gray-100 '>{title}</h1>
      {tags && (
        <div className='text-md  min-h-8 hover:text-purple-500 transform hover:text-lg transition-transform duration-300 ease-in-out'>
          <Link href='/tag'>#tags</Link>
        </div>
      )}
    </header>
  );
};

export default Header;

import { PortableTextBlock } from 'sanity';

export interface Post {
  _id: string;
  title: string;
  overview: string;
  _updatedAt: string;
  _createdAt: string;
  slug: {
    current: string;
  };
  body: PortableTextBlock[];
  publishedAt: string;
  excerpt: string;
  categories: {
    title: string;
  }[];
  mainImage: {
    asset: {
      _ref: string;
      _type: 'imageAsset';
    };
    alt: string;
  };
}

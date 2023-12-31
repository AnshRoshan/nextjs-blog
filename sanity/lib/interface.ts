export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  _createdAt: string;
  _updatedAt: string;

  overview: string;
  body: any;
  tags: Array<Tag>;
  _id: string;
  mainImage: any;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}

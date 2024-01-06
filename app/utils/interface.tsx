export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any;
  tags: Array<Tag>;
  _id: string;
  mainImage: any;
  _createdAt: string;
  _updatedAt: string;
  overview: string;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}

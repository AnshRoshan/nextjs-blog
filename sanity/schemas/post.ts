import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'string',
    }),
    // defineField({
    //   name: 'markdown',
    //   title: 'markdown',
    //   type: 'string',
    // }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
          },
        ],
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
});

# Next.js Blog

![Next.js Logo](/public/next.svg)

Welcome to the Next.js Blog repository! Here, you'll find a collection of blog posts and examples showcasing the features and capabilities of Next.js, a powerful React framework for building modern web applications.

## Table of Contents

- [Introduction](#introduction)
- [Blog Post List](#blog-post-list)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Next.js is a React framework that enables the creation of server-rendered and statically generated React applications. This repository serves as a hub for various blog posts and examples to help you learn and explore Next.js development.

## Blog Post List

### 1. [Server-Side Rendering with Next.js](/posts/server-side-rendering.md)

_Description: Exploring the benefits and implementation of server-side rendering (SSR) in Next.js._

### 2. [Static Site Generation with Next.js](/posts/static-site-generation.md)

_Description: Understanding static site generation (SSG) and its usage in Next.js applications._

```ts
- Route (app)
  - / (Size: 189 B, First Load JS: 96.1 kB)
  - /\_not-found (Size: 885 B, First Load JS: 85.1 kB)
  - /api/revalidate (Size: 0 B, First Load JS: 0 B)
  - /posts/[postId] (Size: 198 B, First Load JS: 96.2 kB)
    - /posts/React
    - /posts/Mongodb
  - /tags/[tag] (Size: 189 B, First Load JS: 96.1 kB)
    - /tags/next
    - /tags/next.js
    - /tags/react
    - [+2 more paths]
- First Load JS shared by all (Size: 84.3 kB)
  - chunks/184-9eb7950b01667934.js (Size: 28.9 kB)
  - chunks/30b509c0-b94fb950b6812fcf.js (Size: 53.4 kB)
  - other shared chunks (total) (Size: 1.93 kB)

○ (Static) prerendered as static content
● (SSG) prerendered as static HTML (uses getStaticProps)
λ (Dynamic) server-rendered on demand using Node.js

```

## Getting Started

To get started with the Next.js Blog, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/AnshRoshan/nextjs-blog.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the files.

## Contributing

We welcome contributions to the Next.js Blog. Whether you want to add a new blog post, fix a bug, or improve documentation, please follow our [Contribution Guidelines](CONTRIBUTING.md) to get started.

## [Blog Location to Add Blogs](https://github.com/AnshRoshan/Blogs)

## License

The Next.js Blog is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute the content for your personal and educational purposes.

Happy coding with Next.js!

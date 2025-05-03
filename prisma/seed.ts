import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database...');

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'alex@example.com' },
    update: {},
    create: {
      email: 'alex@example.com',
      name: 'Alex Johnson',
      password: 'password123', // In a real app, you would hash this
      image: 'https://i.pravatar.cc/300?img=1',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      email: 'sarah@example.com',
      name: 'Sarah Parker',
      password: 'password123', // In a real app, you would hash this
      image: 'https://i.pravatar.cc/300?img=2',
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with Framer Motion',
      content: `
        <h2>Introduction to Framer Motion</h2>
        <p>Framer Motion is a powerful animation library for React that makes it easy to create beautiful animations with minimal code. In this guide, we'll explore the basics of using Framer Motion in your projects.</p>

        <h3>Installation</h3>
        <p>First, you need to install Framer Motion in your React project:</p>
        <pre><code>npm install framer-motion</code></pre>

        <h3>Basic Animation</h3>
        <p>To create a simple animation, import the motion component from framer-motion and use it in place of a regular HTML element:</p>
        <pre><code>
import { motion } from 'framer-motion';

export function AnimatedBox() {
  return (
    &lt;motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    &gt;
      This div will fade in!
    &lt;/motion.div&gt;
  );
}
        </code></pre>

        <h3>Variants</h3>
        <p>Variants are a powerful feature in Framer Motion that allow you to define animation states and transitions between them:</p>
        <pre><code>
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function AnimatedList() {
  return (
    &lt;motion.ul
      initial="hidden"
      animate="visible"
      variants={variants}
    &gt;
      {items.map(item => (
        &lt;motion.li key={item.id} variants={variants}&gt;
          {item.text}
        &lt;/motion.li&gt;
      ))}
    &lt;/motion.ul&gt;
  );
}
        </code></pre>

        <h3>Gestures</h3>
        <p>Framer Motion also makes it easy to add gesture animations like hover and tap effects:</p>
        <pre><code>
&lt;motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
&gt;
  Click me
&lt;/motion.button&gt;
        </code></pre>

        <h3>Conclusion</h3>
        <p>Framer Motion is a powerful tool for adding beautiful animations to your React applications. With its simple API and powerful features, you can create complex animations with minimal code.</p>
      `,
      excerpt: 'Learn how to add beautiful animations to your React applications with Framer Motion.',
      published: true,
      authorId: user1.id,
      coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Creating Responsive Layouts with Tailwind CSS',
      content: `
        <h2>Introduction to Tailwind CSS</h2>
        <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. In this guide, we'll explore how to create responsive layouts using Tailwind CSS.</p>

        <h3>Getting Started</h3>
        <p>First, you need to install Tailwind CSS in your project:</p>
        <pre><code>npm install tailwindcss</code></pre>

        <h3>Basic Responsive Design</h3>
        <p>Tailwind makes responsive design easy with responsive modifiers. Here's how to create a grid that changes from 1 column on mobile to 3 columns on desktop:</p>
        <pre><code>
&lt;div class="grid grid-cols-1 md:grid-cols-3 gap-4"&gt;
  &lt;div class="bg-blue-200 p-4"&gt;Item 1&lt;/div&gt;
  &lt;div class="bg-blue-200 p-4"&gt;Item 2&lt;/div&gt;
  &lt;div class="bg-blue-200 p-4"&gt;Item 3&lt;/div&gt;
&lt;/div&gt;
        </code></pre>

        <h3>Responsive Typography</h3>
        <p>You can also make your typography responsive:</p>
        <pre><code>
&lt;h1 class="text-2xl md:text-4xl lg:text-6xl"&gt;Responsive Heading&lt;/h1&gt;
        </code></pre>

        <h3>Hiding Elements Responsively</h3>
        <p>Sometimes you want to hide or show elements based on screen size:</p>
        <pre><code>
&lt;div class="hidden md:block"&gt;Only visible on medium screens and up&lt;/div&gt;
&lt;div class="md:hidden"&gt;Only visible on small screens&lt;/div&gt;
        </code></pre>

        <h3>Responsive Flexbox</h3>
        <p>You can change how flex containers behave across different screen sizes:</p>
        <pre><code>
&lt;div class="flex flex-col md:flex-row"&gt;
  &lt;div class="p-4"&gt;Column on mobile, row on desktop 1&lt;/div&gt;
  &lt;div class="p-4"&gt;Column on mobile, row on desktop 2&lt;/div&gt;
&lt;/div&gt;
        </code></pre>

        <h3>Conclusion</h3>
        <p>With Tailwind's responsive utilities, you can build complex responsive layouts without writing custom media queries. This approach makes your development workflow faster and more consistent.</p>
      `,
      excerpt: 'Explore how to create responsive designs efficiently using Tailwind CSS utility classes.',
      published: true,
      authorId: user1.id,
      coverImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Introduction to Next.js 13 App Router',
      content: `
        <h2>Next.js 13: The App Router Revolution</h2>
        <p>Next.js 13 introduced the revolutionary App Router, which changes how we build React applications. In this guide, we'll explore the key features and benefits of the new App Router.</p>

        <h3>Server Components</h3>
        <p>One of the biggest changes in Next.js 13 is the introduction of React Server Components. Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client:</p>
        <pre><code>
// app/page.tsx
// This is a Server Component by default
export default function Page() {
  return &lt;h1&gt;Hello, Server Component!&lt;/h1&gt;;
}
        </code></pre>

        <h3>File-based Routing</h3>
        <p>The App Router uses a file-system based router built on top of Server Components:</p>
        <pre><code>
app/
├── page.tsx      // Home route (/)
├── about/
│   └── page.tsx  // About route (/about)
└── blog/
    ├── page.tsx  // Blog index route (/blog)
    └── [slug]/
        └── page.tsx // Dynamic blog post route (/blog/post-1)
        </code></pre>

        <h3>Layouts</h3>
        <p>Layouts allow you to share UI between multiple pages:</p>
        <pre><code>
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    &lt;html lang="en"&gt;
      &lt;body&gt;
        &lt;header&gt;My Website&lt;/header&gt;
        &lt;main&gt;{children}&lt;/main&gt;
        &lt;footer&gt;© 2023&lt;/footer&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}
        </code></pre>

        <h3>Loading States</h3>
        <p>Next.js 13 provides a way to show loading states for each route:</p>
        <pre><code>
// app/dashboard/loading.tsx
export default function Loading() {
  return &lt;div&gt;Loading dashboard...&lt;/div&gt;;
}
        </code></pre>

        <h3>Error Handling</h3>
        <p>You can define error boundaries for your routes:</p>
        <pre><code>
// app/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    &lt;div&gt;
      &lt;h2&gt;Something went wrong!&lt;/h2&gt;
      &lt;button onClick={reset}&gt;Try again&lt;/button&gt;
    &lt;/div&gt;
  );
}
        </code></pre>

        <h3>Conclusion</h3>
        <p>The App Router in Next.js 13 represents a major leap forward in how we build React applications. With Server Components, improved routing, and better loading/error states, it provides a more intuitive and performant development experience.</p>
      `,
      excerpt: 'Discover the powerful features of Next.js 13\'s App Router and how it changes React development.',
      published: true,
      authorId: user2.id,
      coverImage: 'https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  });

  const post4 = await prisma.post.create({
    data: {
      title: 'Getting Started with TypeScript',
      content: `
        <h2>Introduction to TypeScript</h2>
        <p>TypeScript is a strongly typed programming language that builds on JavaScript. In this guide, we'll explore the basics of TypeScript and how it can improve your development workflow.</p>

        <h3>Setting Up TypeScript</h3>
        <p>First, you need to install TypeScript in your project:</p>
        <pre><code>npm install typescript --save-dev</code></pre>

        <h3>Basic Types</h3>
        <p>TypeScript provides several basic types to help you describe your data:</p>
        <pre><code>
// Basic types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = 'blue';
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 10];
        </code></pre>

        <h3>Interfaces</h3>
        <p>Interfaces are a powerful way to define the shape of your objects:</p>
        <pre><code>
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

function createUser(user: User): User {
  return user;
}
        </code></pre>

        <h3>Functions</h3>
        <p>TypeScript allows you to type your function parameters and return values:</p>
        <pre><code>
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function with typed parameters and return type
const multiply = (a: number, b: number): number => a * b;
        </code></pre>

        <h3>Classes</h3>
        <p>TypeScript supports object-oriented programming with classes:</p>
        <pre><code>
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return \`Hello, my name is \${this.name}\`;
  }
}

const person = new Person('John');
console.log(person.greet()); // "Hello, my name is John"
        </code></pre>

        <h3>Type Inference</h3>
        <p>TypeScript can infer types when you don't explicitly provide them:</p>
        <pre><code>
// TypeScript infers the type as number
let x = 3;

// Error: Type 'string' is not assignable to type 'number'
x = 'hello';
        </code></pre>

        <h3>Conclusion</h3>
        <p>TypeScript provides powerful type-checking and tooling that can help you catch errors early, improve code documentation, and enhance your development experience.</p>
      `,
      excerpt: 'Learn the basics of TypeScript and how it can help you write more robust JavaScript code.',
      published: true,
      authorId: user2.id,
      coverImage: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  });

  const post5 = await prisma.post.create({
    data: {
      title: 'Building a REST API with Node.js and Express',
      content: `
        <h2>Building RESTful APIs with Node.js and Express</h2>
        <p>In this tutorial, we'll create a RESTful API using Node.js and Express. We'll cover setting up routes, middleware, error handling, and more.</p>

        <h3>Setting Up Your Project</h3>
        <p>First, let's create a new Node.js project and install the necessary dependencies:</p>
        <pre><code>
mkdir express-api
cd express-api
npm init -y
npm install express morgan cors helmet
npm install --save-dev nodemon
        </code></pre>

        <h3>Creating Your Server</h3>
        <p>Let's create a basic Express server:</p>
        <pre><code>
// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start server
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
        </code></pre>

        <h3>Defining Routes</h3>
        <p>Let's create some basic CRUD routes for a user resource:</p>
        <pre><code>
// routes/users.js
const express = require('express');
const router = express.Router();

// Sample data (in a real app, you'd use a database)
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET a specific user
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update) a user
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE a user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

module.exports = router;
        </code></pre>

        <h3>Integrating Routes in Your App</h3>
        <p>Now let's integrate the routes into our main app:</p>
        <pre><code>
// app.js (updated)
const usersRouter = require('./routes/users');

// ... (previous middleware code)

// Routes
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});
        </code></pre>

        <h3>Error Handling</h3>
        <p>It's important to add proper error handling to your API:</p>
        <pre><code>
// app.js (updated with error handling)

// ... (previous code)

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});
        </code></pre>

        <h3>Conclusion</h3>
        <p>You've now built a basic RESTful API with Node.js and Express! This foundation can be expanded with database integration, authentication, validation, and more sophisticated error handling as your needs grow.</p>
      `,
      excerpt: 'Learn how to build a RESTful API with Node.js and Express, including routes, middleware, and error handling.',
      published: false, // This one is a draft
      authorId: user1.id,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  });

  console.log('Database seeded successfully!');
  console.log(`Created ${await prisma.post.count()} posts`);
  console.log(`Created ${await prisma.user.count()} users`);
}

main()
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

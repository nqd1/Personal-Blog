'use client';

import { useEffect, useState } from 'react';
import { PostCard } from '@/components/blog/post-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MotionDiv } from '@/components/animations/motion-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';

type Post = {
  id: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  createdAt: string;
  published: boolean; 
  author: {
    id: string;
    name: string;
    image?: string | null;
  };
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search query and published status
  const filteredPosts = searchQuery
    ? posts.filter(post =>
        post.published &&
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : posts.filter(post => post.published);

  return (
    <>
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <MotionDiv variant="fadeInUp" className="space-y-3 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Blog</h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Discover stories, thoughts, and insights from our talented writers.
            </p>
          </MotionDiv>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          {/* Search and Filter */}
          <MotionDiv variant="fadeInUp" delay={0.1} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="size-10 shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Filter posts</span>
              </Button>
            </div>
          </MotionDiv>

          {/* Posts Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              // Skeleton loaders
              Array.from({ length: 6 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))
            ) : filteredPosts.length > 0 ? (
              // Actual posts
              filteredPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  delay={index * 0.05}
                />
              ))
            ) : (
              // No posts or no search results
              <MotionDiv variant="fadeIn" className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium">
                  {searchQuery ? 'No posts match your search' : 'No posts found'}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {searchQuery ? 'Try a different search term' : 'Check back later for new content'}
                </p>
              </MotionDiv>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

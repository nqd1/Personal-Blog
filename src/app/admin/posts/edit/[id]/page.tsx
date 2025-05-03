'use client';

import { useEffect, useState } from 'react';
import { PostForm } from '@/components/blog/post-form';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type Post = {
  id: string;
  title: string;
  content: string;
  excerpt?: string | null;
  coverImage?: string | null;
  published: boolean;
  authorId: string;
};

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);

        if (!response.ok) {
          if (response.status === 404) {
            toast.error('Post not found');
            router.push('/admin/dashboard');
            return;
          }
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, router]);

  const handleSuccess = (postId: string) => {
    router.push(`/blog/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-8">
          The post you're trying to edit doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <PostForm
      mode="edit"
      initialData={{
        id: post.id,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        coverImage: post.coverImage || '',
        published: post.published,
        authorId: post.authorId
      }}
      onSuccess={handleSuccess}
    />
  );
}

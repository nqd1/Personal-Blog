'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MotionDiv } from '@/components/animations/motion-provider';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow, format } from 'date-fns';
import { CalendarIcon, ChevronLeftIcon, EditIcon, Trash2Icon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

type Post = {
  id: string;
  title: string;
  content: string;
  excerpt?: string | null;
  coverImage?: string | null;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  user: { // changed from author
    id: string;
    name: string;
    image?: string | null;
  };
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);

        if (!response.ok) {
          if (response.status === 404) {
            toast.error('Post not found');
            router.push('/blog');
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      toast.success('Post deleted successfully');
      router.push('/blog');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-64 w-full rounded-lg mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-12 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-8">The post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  // Format dates for display
  const publishedDate = format(new Date(post.createdAt), 'MMMM dd, yyyy');
  const updatedAgo = formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true });

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <MotionDiv variant="fadeInUp" className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              {post.user.image ? (
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image
                    src={post.user.image}
                    alt={post.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                  <UserIcon className="h-3 w-3" />
                </div>
              )}
              <span>{post.user.name}</span>
            </div>

            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Published {publishedDate}</span>
            </div>

            {post.updatedAt !== post.createdAt && (
              <div className="text-xs opacity-70">
                Updated {updatedAgo}
              </div>
            )}
          </div>

          {post.coverImage && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.1} className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </MotionDiv>

        {/* Admin Actions - in a real app, check permissions first */}
        <MotionDiv variant="fadeInUp" delay={0.2} className="mt-12 pt-6 border-t flex justify-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/posts/edit/${post.id}`}>
              <EditIcon className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </MotionDiv>
      </div>
    </div>
  );
}

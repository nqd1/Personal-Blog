'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MotionDiv } from '@/components/animations/motion-provider';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { BookmarkIcon, EditIcon, PlusIcon, SearchIcon, Trash2Icon, LayoutDashboardIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type Post = {
  id: string;
  title: string;
  excerpt?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
};

type Stats = {
  totalPosts: number;
  publishedPosts: number;
  drafts: number;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    drafts: 0
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);

        // Calculate stats
        const publishedPosts = data.filter((post: Post) => post.published).length;
        const drafts = data.filter((post: Post) => !post.published).length;

        setStats({
          totalPosts: data.length,
          publishedPosts,
          drafts
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Update state
      setPosts(posts.filter(post => post.id !== postId));
      setStats({
        ...stats,
        totalPosts: stats.totalPosts - 1,
        publishedPosts: stats.publishedPosts - (posts.find(p => p.id === postId)?.published ? 1 : 0),
        drafts: stats.drafts - (!posts.find(p => p.id === postId)?.published ? 1 : 0)
      });

      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  // Filter posts by status
  const publishedPosts = filteredPosts.filter(post => post.published);
  const draftPosts = filteredPosts.filter(post => !post.published);

  return (
    <div className="container py-10">
      <MotionDiv variant="fadeInUp" className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your blog posts and content</p>
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MotionDiv variant="fadeInUp" delay={0.1}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <LayoutDashboardIcon className="h-5 w-5 text-primary mr-2" />
                <p className="text-2xl font-bold">{stats.totalPosts}</p>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.2}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookmarkIcon className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-2xl font-bold">{stats.publishedPosts}</p>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.3}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <EditIcon className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-2xl font-bold">{stats.drafts}</p>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>

      <MotionDiv variant="fadeInUp" delay={0.4} className="mb-6 flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </MotionDiv>

      <MotionDiv variant="fadeInUp" delay={0.5}>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Posts ({filteredPosts.length})</TabsTrigger>
            <TabsTrigger value="published">Published ({publishedPosts.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftPosts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredPosts.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                onDelete={() => handleDeletePost(post.id)}
                delay={index * 0.05}
              />
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No posts found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            {publishedPosts.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                onDelete={() => handleDeletePost(post.id)}
                delay={index * 0.05}
              />
            ))}
            {publishedPosts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No published posts found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            {draftPosts.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                onDelete={() => handleDeletePost(post.id)}
                delay={index * 0.05}
              />
            ))}
            {draftPosts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No draft posts found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </MotionDiv>
    </div>
  );
}

function PostItem({ post, onDelete, delay = 0 }: { post: Post; onDelete: () => void; delay?: number }) {
  const formattedDate = formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true });

  return (
    <MotionDiv variant="fadeInUp" delay={delay}>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>
                Last updated {formattedDate}
              </CardDescription>
            </div>
            <div className="flex items-center gap-1">
              {post.published ? (
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                  Published
                </span>
              ) : (
                <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                  Draft
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt || 'No excerpt available'}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/blog/${post.id}`}>
              View
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/posts/edit/${post.id}`}>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <Trash2Icon className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
}

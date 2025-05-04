'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MotionDiv } from '@/components/animations/motion-provider';
import { toast } from 'sonner';
import { ChevronLeftIcon, ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';

type PostFormProps = {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    excerpt?: string;
    coverImage?: string;
    published: boolean;
    authorId: string;
  };
  mode: 'create' | 'edit';
  onSuccess?: (postId: string) => void;
};

export function PostForm({ initialData, mode, onSuccess }: PostFormProps) {
  const router = useRouter();
  const isEditing = mode === 'edit';

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    coverImage: initialData?.coverImage || '',
    published: initialData?.published || false,
    authorId: initialData?.authorId || '1', // Default authorId for demo
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing
        ? `/api/posts/${initialData?.id}`
        : '/api/posts';

      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (err) {
          errorData = { error: await response.text() };
        }
        console.error("Error creating/updating post:", errorData);
        const errorMessage = errorData?.error || 'Unknown error';
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} post: ${errorMessage}`);
      }

      const data = await response.json();

      toast.success(
        isEditing
          ? 'Post updated successfully!'
          : 'Post created successfully!'
      );

      if (onSuccess) {
        onSuccess(data.id);
      } else {
        // Navigate to the post detail page
        router.push(`/blog/${data.id}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(
        isEditing
          ? 'Failed to update post. Please try again.'
          : 'Failed to create post. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container py-10">
        <MotionDiv variant="fadeInUp" className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/dashboard">
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.1} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? 'Update your post content and settings'
              : 'Fill in the details to create a new blog post'}
          </p>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.2}>
          <Card className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary of your post (optional)"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">
                    A short summary that appears on post previews
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your post content here..."
                    rows={12}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <div className="flex">
                    <Input
                      id="coverImage"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="rounded-r-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Browse
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    URL to your post cover image (optional)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="published" className="cursor-pointer">
                    Publish this post
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? 'Update Post' : 'Create Post'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </MotionDiv>
      </div>
    </>
  );
}

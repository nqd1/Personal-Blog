'use client';

import { PostForm } from '@/components/blog/post-form';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();

  const handleSuccess = (postId: string) => {
    router.push(`/blog/${postId}`);
  };

  return (
    <PostForm
      mode="create"
      onSuccess={handleSuccess}
    />
  );
}

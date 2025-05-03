'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MotionDiv } from "@/components/animations/motion-provider";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";

type PostCardProps = {
  post: {
    id: string;
    title: string;
    excerpt?: string | null;
    coverImage?: string | null;
    createdAt: Date | string;
    author: {
      id: string;
      name: string;
      image?: string | null;
    };
  };
  variant?: 'fadeInUp' | 'fadeIn' | 'slideInFromLeft' | 'slideInFromRight';
  delay?: number;
  isCompact?: boolean;
};

export function PostCard({ post, variant = 'fadeInUp', delay = 0, isCompact = false }: PostCardProps) {
  // Format the date
  const formattedDate = typeof post.createdAt === 'string'
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : formatDistanceToNow(post.createdAt, { addSuffix: true });

  return (
    <MotionDiv variant={variant} delay={delay}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <Link href={`/blog/${post.id}`} className="block h-full">
          {post.coverImage && !isCompact && (
            <div className="relative w-full h-48 overflow-hidden">
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-muted-foreground/30 border-t-muted-foreground animate-spin" />
              </div>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <CardHeader className={isCompact ? 'px-4 py-3' : 'px-5 py-4'}>
            <h3 className={`font-bold tracking-tight ${isCompact ? 'text-lg' : 'text-xl'} line-clamp-2`}>
              {post.title}
            </h3>
          </CardHeader>

          {!isCompact && post.excerpt && (
            <CardContent className="px-5 py-0">
              <p className="text-muted-foreground text-sm line-clamp-3">
                {post.excerpt}
              </p>
            </CardContent>
          )}

          <CardFooter className={`flex justify-between items-center text-xs text-muted-foreground ${isCompact ? 'px-4 py-3' : 'px-5 py-4'}`}>
            <div className="flex items-center gap-2">
              {post.author.image ? (
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                  <UserIcon className="h-3 w-3" />
                </div>
              )}
              <span>{post.author.name}</span>
            </div>

            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </MotionDiv>
  );
}

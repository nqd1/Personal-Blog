'use client';

import { Button } from '@/components/ui/button';
import { MotionDiv } from '@/components/animations/motion-provider';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <MotionDiv variant="fadeInUp" className="space-y-4 max-w-md mx-auto">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-6">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </MotionDiv>
    </div>
  );
}

'use client';

import { MotionDiv } from '@/components/animations/motion-provider';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <MotionDiv variant="fadeInUp" className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              A platform to share my learning journey and share my knowledge with the world.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <MotionDiv variant="slideInFromLeft" className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Who Am I?</h2>
              <p className="text-muted-foreground">
                Hi, I'm NQD, a passionate learner and developer. This blog is my personal space to document my learning journey, share insights, and connect with others who are also eager to grow.
              </p>
              <p className="text-muted-foreground">
                I believe that sharing knowledge not only helps others but also deepens my own understanding. Here, you'll find articles, tutorials, and reflections on topics I'm exploring.
              </p>
              <p className="text-muted-foreground">
                Whether you're just starting out or looking to expand your expertise, I hope my experiences and resources can help you on your own path.
              </p>
            </MotionDiv>

            <MotionDiv variant="slideInFromRight" delay={0.2} className="relative aspect-video overflow-hidden rounded-xl border">
              <Image
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Person typing on laptop with coffee"
                fill
                className="object-cover"
                priority
              />
            </MotionDiv>
          </div>
        </div>
      </section>
    </>
  );
}

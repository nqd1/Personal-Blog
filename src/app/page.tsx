import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/animations/motion-provider";
import Link from "next/link";
import { ArrowRight, BookOpen, Pen, Star } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden h-screen py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <MotionDiv variant="fadeInUp" className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Hello, I'm Nguyen Quy Duc. Welcome to my 
                <span className="bg-gradient-to-r from-rose-400 to-amber-500 bg-clip-text text-transparent"> personal blog</span>
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A platform to share my learning journey and share my knowledge with the world.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/blog">
                    Explore Posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Start Writing</Link>
                </Button>
              </div>
            </MotionDiv>
            <MotionDiv variant="fadeInUp" 
                      delay={0.2} 
                      className="relative aspect-video overflow-hidden rounded-xl border max-w-[80%]">
              <div className="flex items-center justify-center h-full">
                <img
                  src="/NDK_0570.jpg"
                  alt="Picture of me"
                  className="block w-full aspect-square object-cover transform translate-y-[20%]"
                />
              </div>
            </MotionDiv>
    
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container px-4 md:px-6">
          <MotionDiv variant="fadeInUp" className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Powerful features that make blogging better
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to create, manage, and grow your blog
            </p>
          </MotionDiv>

          <div className="grid gap-6 md:grid-cols-3">
            <MotionDiv variant="fadeInUp" delay={0.1} className="flex flex-col p-6 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Pen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Content Creation</h3>
              <p className="text-muted-foreground flex-1">
                Intuitive editor that makes creating beautiful content simple and enjoyable.
              </p>
            </MotionDiv>

            <MotionDiv variant="fadeInUp" delay={0.2} className="flex flex-col p-6 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Elegant Reading Experience</h3>
              <p className="text-muted-foreground flex-1">
                Beautiful typography and animations that enhance the reading experience.
              </p>
            </MotionDiv>

            <MotionDiv variant="fadeInUp" delay={0.3} className="flex flex-col p-6 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complete CRUD Functionality</h3>
              <p className="text-muted-foreground flex-1">
                Full control over your content with Create, Read, Update, and Delete operations.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <MotionDiv variant="scaleUp" className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="grid gap-6 text-center justify-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  Ready to start your blogging journey?
                </h2>
                <p className="text-white/80 mx-auto max-w-[600px] md:text-xl/relaxed">
                  Join our community of writers and share your stories with the world.
                </p>
              </div>
              <div className="mx-auto">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}

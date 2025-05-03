"use client";

import { useEffect } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { MotionContainer } from "@/components/animations/motion-provider";
import { Toaster } from "sonner";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <div className="antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MotionContainer>
          {children}
        </MotionContainer>
      </main>
      <Toaster position="top-right" closeButton />
      <Footer />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { MotionDiv } from '@/components/animations/motion-provider';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <MotionDiv variant="fadeInUp" className="space-y-4">
            <h3 className="font-semibold text-lg">NqdBlog</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              A platform to upload my learning journey and share my knowledge with the world.
              <br />
            </p>
          </MotionDiv>

          <MotionDiv variant="fadeInUp" delay={0.1} className="space-y-4">
            <h3 className="font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </MotionDiv>

          <MotionDiv variant="fadeInUp" delay={0.2} className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </MotionDiv>

          <MotionDiv variant="fadeInUp" delay={0.3} className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: nqd001205@gmail.com
              </li>
              <li className="text-muted-foreground">
                Location: Hanoi, Vietnam
              </li>
            </ul>
          </MotionDiv>
        </div>

        <MotionDiv variant="fadeInUp" delay={0.4} className="mt-12 pt-6 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
          <p>© {currentYear} Nqd Blog. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://www.facebook.com/nqd1445" 
                  className="hover:text-primary transition-colors" 
                  target="_blank">
              <FaFacebook style={{ fontSize: '1.5em' }} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://github.com/nqd1" 
                  className="hover:text-primary transition-colors" 
                  target="_blank">
              <FaGithub style={{ fontSize: '1.5em' }} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/qu%C3%BD-%C4%91%E1%BB%A9c-nguy%E1%BB%85n-95b617358/" 
                  className="hover:text-primary transition-colors"
                  target="_blank">
              <FaLinkedin style={{ fontSize: '1.5em' }} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </MotionDiv>
      </div>
    </footer>
  );
}

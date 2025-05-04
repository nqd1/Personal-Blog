'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MotionDiv } from '@/components/animations/motion-provider';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
];

const adminItems = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'New Post', path: '/admin/posts/new' },
];

export function Header() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // load persisted theme if exists
    const persisted = localStorage.getItem('theme');
    const isDark = persisted ? persisted === 'dark' : document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    const el = document.documentElement;
    el.style.transition = 'background-color 0.6s, color 0.6s';
    return () => {
      el.style.transition = '';
    };
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
      <MotionDiv
        variant="fadeInUp"
        className="container flex justify-between items-center h-16"
      >
        <Link href="/" className="font-bold text-xl">
          NqdBlog
        </Link>

        {/* Desk Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item, idx) => (
            <MotionDiv
              key={item.path}
              variant="fadeInUp"
              delay={idx * 0.1}
            >
              <Link
                href={item.path}
                className={`transition-colors hover:text-primary ${
                  pathname === item.path ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            </MotionDiv>
          ))}

          {isLoggedIn && (
            <>
              <div className="h-4 border-l border-border mx-2" />
              {adminItems.map((item, idx) => (
                <MotionDiv
                  key={item.path}
                  variant="fadeInUp"
                  delay={(idx + navItems.length) * 0.1}
                >
                  <Link
                    href={item.path}
                    className={`transition-colors hover:text-primary ${
                      pathname === item.path ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                </MotionDiv>
              ))}
              <Link href="/account" className="transition-colors hover:text-primary">
                Account Details
              </Link>
            </>
          )}

          <MotionDiv
            variant="fadeInUp"
            delay={(navItems.length + (isLoggedIn ? adminItems.length : 0)) * 0.1}
          >
            {isLoggedIn ? (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="transition-colors hover:text-primary"
              >
                Logout
              </button>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </MotionDiv>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
            className="ml-2"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </nav>

        {/* Mob Btn */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </MotionDiv>

      {mobileMenuOpen && (
        <MotionDiv
          variant="fadeInUp"
          className="md:hidden py-4 px-6 border-t absolute w-full bg-background z-50 shadow-lg"
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, idx) => (
              <MotionDiv
                key={item.path}
                variant="fadeInUp"
                delay={idx * 0.05}
              >
                <Link
                  href={item.path}
                  className={`transition-colors block py-2 hover:text-primary ${
                    pathname === item.path ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </MotionDiv>
            ))}

            {isLoggedIn && (
              <>
                <div className="border-t border-border my-2" />
                {adminItems.map((item, idx) => (
                  <MotionDiv
                    key={item.path}
                    variant="fadeInUp"
                    delay={(idx + navItems.length) * 0.05}
                  >
                    <Link
                      href={item.path}
                      className={`transition-colors block py-2 hover:text-primary ${
                        pathname === item.path ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </MotionDiv>
                ))}
                <Link
                  href="/account"
                  className="transition-colors block py-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account Details
                </Link>
              </>
            )}

            <MotionDiv
              variant="fadeInUp"
              delay={(navItems.length + (isLoggedIn ? adminItems.length : 0)) * 0.05}
              className="pt-2"
            >
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setMobileMenuOpen(false);
                  }}
                  className="transition-colors hover:text-primary w-full text-left"
                >
                  Logout
                </button>
              ) : (
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </Button>
              )}
            </MotionDiv>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
              className="self-start mt-2"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </nav>
        </MotionDiv>
      )}
    </header>
  );
}

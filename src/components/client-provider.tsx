'use client';
import { Providers } from './providers';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}

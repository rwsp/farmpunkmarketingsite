import type { ReactNode } from 'react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import './layout.css';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="fp-layout">
      <Nav />
      <main className="fp-layout__main">{children}</main>
      <Footer />
    </div>
  );
}

'use client';
import React from "react";
import Link from "next/link";
import { User, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navLinkClass = (href: string) =>
    `px-4 py-2 rounded transition font-medium ${
      pathname === href
        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold'
        : 'bg-transparent text-[#111827] hover:bg-[var(--secondary)]'
    }`;
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <header className="shadow py-4 px-6 flex items-center justify-between border-b" style={{ backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' }}>
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: '#111827' }}>E-Store</span>
          </Link>
          <nav className="hidden md:flex gap-2 ml-8">
            <Link href="/products_catalog" className={navLinkClass('/products_catalog')}>
              Products Catalog
            </Link>
            <Link href="/about" className={navLinkClass('/about')}>
              About
            </Link>
            <Link href="/contact" className={navLinkClass('/contact')}>
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex gap-4">
          <Link href="/auth/signin" aria-label="Sign In">
            <User className="w-6 h-6 text-[#111827]" />
          </Link>
          <Link href="/cart" aria-label="Cart">
            <ShoppingCart className="w-6 h-6 text-[#111827]" />
          </Link>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">{children}</main>
      {/* Footer */}
      <footer className="border-t py-6 px-6 mt-8" style={{ backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ color: '#111827' }}>&copy; {new Date().getFullYear()} E-Store. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline" style={{ color: '#111827' }}>Privacy Policy</Link>
            <Link href="/terms" className="hover:underline" style={{ color: '#111827' }}>Terms</Link>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#111827' }}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#111827' }}>Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#111827' }}>Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 
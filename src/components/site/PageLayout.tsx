import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageLayout({
  title,
  intro,
  breadcrumb,
  children,
}: {
  title: string;
  intro?: string;
  breadcrumb?: { label: string; to?: string }[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-ink-soft">
          <Link to="/" className="hover:text-accent">Home</Link>
          {breadcrumb?.map((b, i) => (
            <span key={i}>
              <span className="mx-1">/</span>
              {b.to ? (
                <Link to={b.to} className="hover:text-accent">{b.label}</Link>
              ) : (
                <span className="text-ink">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
        <header className="mt-4 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">{title}</h1>
          {intro && <p className="mt-3 text-base text-ink-soft">{intro}</p>}
        </header>
        <div className="mt-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

import React from 'react';
import Nav from '@/components/home/Nav';
import Hero from '@/components/home/Hero';
import BookmarkletCard from '@/components/home/BookmarkletCard';
import HowItWorks from '@/components/home/HowItWorks';
import Faq from '@/components/home/Faq';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative noise">
      <Nav />
      <Hero />
      <BookmarkletCard />
      <HowItWorks />
      <Faq />
      <Footer />
    </div>
  );
}
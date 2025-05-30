
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ServiceCatalog } from '@/components/ServiceCatalog';
import { QuickActions } from '@/components/QuickActions';
import { KnowledgeBase } from '@/components/KnowledgeBase';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
          <ServiceCatalog />
          <QuickActions />
          <KnowledgeBase />
        </div>
      </div>
    </div>
  );
};

export default Index;

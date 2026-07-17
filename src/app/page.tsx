import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/app/components/LoadingScreen';
import CursorGlow from '@/app/components/CursorGlow';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import TechStackSection from '@/app/components/TechStackSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import GitHubSection from '@/app/components/GitHubSection';
import TimelineSection from '@/app/components/TimelineSection';
import ContactSection from '@/app/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <Header />
      <main>
        <HeroSection />
        {/* Divider */}
        <div className="divider-gradient mx-6 md:mx-20" />
        <AboutSection />
        <div className="divider-gradient mx-6 md:mx-20" />
        <TechStackSection />
        <div className="divider-gradient mx-6 md:mx-20" />
        <ProjectsSection />
        <div className="divider-gradient mx-6 md:mx-20" />
        <GitHubSection />
        <div className="divider-gradient mx-6 md:mx-20" />
        <TimelineSection />
        <div className="divider-gradient mx-6 md:mx-20" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
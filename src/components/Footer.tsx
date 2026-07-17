'use client';
import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
  }, []);

  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <AppLogo size={28} />
          <span className="text-sm text-muted-foreground">
            {year && `© ${year}`} Arshil. Built with passion.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/arshil"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Icon name="CodeBracketIcon" size={20} />
          </a>
          <a
            href="https://linkedin.com/in/arshil"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Icon name="BriefcaseIcon" size={20} />
          </a>
          <a
            href="mailto:arshil@email.com"
            className="social-icon-btn text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Icon name="EnvelopeIcon" size={20} />
          </a>
        </div>

        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
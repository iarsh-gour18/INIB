'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: typeof import('gsap').gsap;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;

    const init = async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      gsap = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ delay: 1.4 });

      // Split heading into chars
      if (headingRef.current) {
        const text = headingRef.current.innerHTML;
        const words = text.split(' ');
        headingRef.current.innerHTML = words.
        map(
          (word) =>
          `<span class="word-char"><span class="char-inner">${word}</span></span>`
        ).
        join(' ');

        tl.fromTo(
          headingRef.current.querySelectorAll('.char-inner'),
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out'
          }
        );
      }

      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      ).
      fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      ).
      fromTo(
        btnsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      ).
      fromTo(
        macbookRef.current,
        { x: 60, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      ).
      fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Parallax on scroll
      gsap.to(macbookRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    };

    init();
  }, []);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  const handleScrollDown = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) aboutEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden">
      
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden="true" />

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div
          className="blob-primary blob-animate-1 absolute"
          style={{ width: '600px', height: '600px', top: '-10%', left: '-15%' }} />
        
        <div
          className="blob-accent blob-animate-2 absolute"
          style={{ width: '500px', height: '500px', top: '20%', right: '-10%' }} />
        
        <div
          className="blob-soft blob-animate-3 absolute"
          style={{ width: '400px', height: '400px', bottom: '5%', left: '30%' }} />
        
        {/* Particles */}
        {[...Array(12)].map((_, i) =>
        <div
          key={i}
          className="particle absolute rounded-full"
          style={{
            width: `${3 + i % 4}px`,
            height: `${3 + i % 4}px`,
            background: i % 2 === 0 ? 'rgba(79,70,229,0.5)' : 'rgba(6,182,212,0.5)',
            left: `${8 + i * 7.5}%`,
            bottom: `${10 + i % 5 * 12}%`,
            animationDuration: `${6 + i * 1.5}s`,
            animationDelay: `${i * 0.8}s`
          }} />

        )}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold text-muted-foreground tracking-wide">
                Available for work · July 2026
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-hero-xl font-extrabold text-foreground leading-[1.05] tracking-tight"
              style={{ opacity: 1 }}>
              
              Hi, I&apos;m Arshil.
            </h1>

            {/* Sub heading */}
            <p
              ref={subRef}
              className="text-2xl md:text-3xl font-semibold gradient-text leading-tight">
              
              Full Stack MERN Developer
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              
              Building scalable web applications with AI integration. I craft
              performant, elegant digital experiences — from pixel-perfect UIs
              to robust backend systems.
            </p>

            {/* Buttons */}
            <div ref={btnsRef} className="flex flex-wrap gap-4 pt-2">
              <a
                href="assets/files/resume.pdf"
                download="resume.pdf"
                className="magnetic-btn glow-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full gradient-bg text-white font-semibold text-sm relative overflow-hidden">
                
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
              <button
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseDown={handleRipple}
                className="magnetic-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full glass-card border border-primary/20 text-primary font-semibold text-sm hover:bg-primary/5 transition-colors relative overflow-hidden">
                
                View Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseDown={handleRipple}
                className="magnetic-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full glass-card border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors relative overflow-hidden">
                
                Contact Me
              </button>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-border/50 mt-2">
              {[
              { val: '3+', label: 'Projects Shipped' },
              { val: '2+', label: 'Years Learning' },
              { val: '10+', label: 'Technologies' }].
              map(({ val, label }) =>
              <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-extrabold gradient-text stat-counter">{val}</span>
                  <span className="text-xs text-muted-foreground font-medium">{label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: MacBook Mockup */}
          <div ref={macbookRef} className="flex items-center justify-center lg:justify-end">
            <div className="relative macbook-float macbook-shadow" style={{ maxWidth: '580px', width: '100%' }}>
              {/* MacBook body */}
              <div className="relative" style={{ perspective: '1200px' }}>
                {/* Screen */}
                <div
                  className="relative rounded-t-2xl overflow-hidden"
                  style={{
                    background: '#1a1a2e',
                    paddingTop: '62%',
                    borderRadius: '12px 12px 0 0',
                    border: '3px solid #2d2d4a',
                    borderBottom: 'none'
                  }}>
                  
                  {/* Camera dot */}
                  <div
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700 z-10"
                    style={{ zIndex: 10 }} />
                  
                  {/* Screen content */}
                  <div className="absolute inset-0 overflow-hidden" style={{ top: '16px' }}>
                    {/* Video on desktop */}
                    <video
                      className="w-full h-full object-cover hidden md:block"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="https://img.rocket.new/generatedImages/rocket_gen_img_12225c17b-1765211045033.png">
                      
                      <source
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        type="video/mp4" />
                      
                    </video>
                    {/* Mobile poster */}
                    <div className="md:hidden relative w-full h-full">
                      <AppImage
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
                        alt="Code editor showing full-stack MERN development environment with dark theme"
                        fill
                        className="object-cover"
                        priority />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center border border-white/30">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Screen overlay glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(6,182,212,0.06) 100%)'
                      }} />
                    
                  </div>
                </div>

                {/* Base / keyboard */}
                <div
                  className="relative"
                  style={{
                    background: 'linear-gradient(180deg, #2d2d4a 0%, #1e1e32 100%)',
                    height: '22px',
                    borderRadius: '0 0 6px 6px',
                    border: '3px solid #2d2d4a',
                    borderTop: 'none'
                  }}>
                  
                  {/* Trackpad notch */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                    style={{
                      width: '60px',
                      height: '8px',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '4px'
                    }} />
                  
                </div>

                {/* Reflection */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-8 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(79,70,229,0.12) 0%, transparent 100%)',
                    filter: 'blur(8px)',
                    transform: 'scaleY(-1) translateY(-4px)'
                  }} />
                
              </div>

              {/* Floating status card */}
              <div
                className="absolute -bottom-6 -left-8 glass-card-strong rounded-2xl px-5 py-4 shadow-glass-lg hidden lg:flex items-center gap-3"
                style={{ minWidth: '180px' }}>
                
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Status</p>
                  <p className="text-sm font-bold text-foreground">Building...</p>
                </div>
              </div>

              {/* Floating tech card */}
              <div
                className="absolute -top-6 -right-6 glass-card-strong rounded-2xl px-4 py-3 shadow-glass-lg hidden lg:flex items-center gap-2.5">
                
                <div className="flex gap-1.5">
                  {['#61DAFB', '#68A063', '#4F46E5'].map((c, i) =>
                  <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  )}
                </div>
                <p className="text-xs font-semibold text-foreground">React · Node · MongoDB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          className="flex flex-col items-center gap-2 mt-16 cursor-pointer"
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleScrollDown()}
          aria-label="Scroll down">
          
          <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Scroll</span>
          <div className="scroll-indicator flex flex-col items-center gap-1">
            <div className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full gradient-bg" />
            </div>
          </div>
        </div>
      </div>
    </section>);

}
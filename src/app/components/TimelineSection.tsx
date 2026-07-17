'use client';
import React, { useEffect, useRef } from 'react';

const roadmap = [
  {
    year: '2025',
    title: 'Started Full Stack',
    detail: 'Began building real MERN stack applications. Shipped first production-ready project — Wanderlust travel platform.',
    icon: '🚀',
    status: 'done',
    side: 'left',
  },
  {
    year: '2026',
    title: 'Built MERN Projects',
    detail: 'Developed multiple full-stack apps, learned cloud deployment, integrated third-party APIs, and started AI integration.',
    icon: '⚡',
    status: 'current',
    side: 'right',
  },
  {
    year: '2026',
    title: 'Learning AI Integration',
    detail: 'Exploring OpenAI, LangChain, and Hugging Face. Building AI-powered SaaS product as next major project.',
    icon: '🤖',
    status: 'current',
    side: 'left',
  },
  {
    year: 'Near Future',
    title: 'Software Engineer',
    detail: 'Target: Join a product-driven tech company or build a profitable SaaS. Contribute to open source.',
    icon: '🎯',
    status: 'future',
    side: 'right',
  },
  {
    year: 'Long Term',
    title: 'Lead & Build at Scale',
    detail: 'Lead engineering teams, architect scalable systems, and mentor the next generation of developers.',
    icon: '🌟',
    status: 'future',
    side: 'left',
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(
          el,
          { x: fromX, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden"
    >
      <div
        className="blob-soft absolute pointer-events-none"
        style={{ width: '500px', height: '500px', left: '50%', top: '20%', transform: 'translateX(-50%)', opacity: 0.6 }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            Career Roadmap
          </span>
          <h2 className="text-section-title font-extrabold text-foreground tracking-tight leading-tight">
            The journey
            <br />
            <span className="gradient-text">so far.</span>
          </h2>
        </div>

        {/* Desktop: Alternating timeline */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 timeline-line rounded-full"
            style={{ zIndex: 0 }}
          />

          <div className="flex flex-col gap-12">
            {roadmap.map((item, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`relative flex items-center gap-0 ${
                  item.side === 'left' ? 'flex-row' : 'flex-row-reverse'
                }`}
                style={{ opacity: 1 }}
              >
                {/* Card */}
                <div
                  className={`w-[calc(50%-3rem)] ${
                    item.side === 'left' ? 'mr-auto pr-8' : 'ml-auto pl-8'
                  }`}
                >
                  <div
                    className={`glass-card rounded-2xl p-6 relative ${
                      item.status === 'current' ?'border border-primary/25 shadow-glass-lg'
                        : item.status === 'future' ?'border border-dashed border-border opacity-80' :''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          item.status === 'current' ?'tag-pill'
                            : item.status === 'future' ?'tag-pill-accent' :'bg-green-100 text-green-700'
                        }`}
                      >
                        {item.year}
                      </span>
                      {item.status === 'current' && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-green-600 font-medium">Now</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
                    item.status === 'done'
                      ? 'glass-card-strong border-2 border-green-300'
                      : item.status === 'current' ?'gradient-bg shadow-glow-primary' :'glass-card border-2 border-dashed border-primary/30'
                  }`}
                >
                  {item.icon}
                </div>

                {/* Empty side */}
                <div className="w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden relative pl-16">
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 timeline-line rounded-full"
            style={{ zIndex: 0 }}
          />
          <div className="flex flex-col gap-8">
            {roadmap.map((item, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i + roadmap.length] = el; }}
                className="relative"
                style={{ opacity: 1 }}
              >
                <div
                  className={`absolute -left-10 top-1 w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 ${
                    item.status === 'done'
                      ? 'glass-card-strong border-2 border-green-300'
                      : item.status === 'current' ?'gradient-bg' :'glass-card border-2 border-dashed border-primary/30'
                  }`}
                >
                  {item.icon}
                </div>
                <div
                  className={`glass-card rounded-2xl p-5 ${
                    item.status === 'current' ? 'border border-primary/25' : ''
                  }`}
                >
                  <span className="text-xs font-bold tag-pill px-2.5 py-1 rounded-full mb-2 inline-block">
                    {item.year}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
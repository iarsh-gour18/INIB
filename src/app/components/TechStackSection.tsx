'use client';
import React, { useEffect, useRef } from 'react';

/* BENTO GRID AUDIT:
   Array has 13 cards: React, Node, Express, MongoDB, MySQL, JavaScript, Tailwind, Git, GitHub, REST API, JWT, Cloudinary, AI APIs
   Row 1 (4 cols): [col-1: React cs-1] [col-2: Node cs-1] [col-3: Express cs-1] [col-4: MongoDB cs-1]
   Row 2 (4 cols): [col-1: MySQL cs-1] [col-2: JavaScript cs-1] [col-3: Tailwind cs-1] [col-4: Git cs-1]
   Row 3 (4 cols): [col-1: GitHub cs-1] [col-2: REST API cs-1] [col-3: JWT cs-1] [col-4: Cloudinary cs-1]
   Row 4 (4 cols): [col-1: AI APIs cs-4 (full row)]
   Placed 13/13 cards ✓
*/

const techStack = [
  { name: 'React', icon: '⚛️', color: '#61DAFB', bg: 'rgba(97,218,251,0.08)', category: 'Frontend' },
  { name: 'Node.js', icon: '🟢', color: '#68A063', bg: 'rgba(104,160,99,0.08)', category: 'Backend' },
  { name: 'Express', icon: '🚂', color: '#4F46E5', bg: 'rgba(79,70,229,0.08)', category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', bg: 'rgba(71,162,72,0.08)', category: 'Database' },
  { name: 'MySQL', icon: '🐬', color: '#4479A1', bg: 'rgba(68,121,161,0.08)', category: 'Database' },
  { name: 'JavaScript', icon: '✨', color: '#F7DF1E', bg: 'rgba(247,223,30,0.08)', category: 'Language' },
  { name: 'Tailwind', icon: '🎨', color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', category: 'Styling' },
  { name: 'Git', icon: '🔀', color: '#F05032', bg: 'rgba(240,80,50,0.08)', category: 'DevOps' },
  { name: 'GitHub', icon: '🐙', color: '#333333', bg: 'rgba(51,51,51,0.06)', category: 'DevOps' },
  { name: 'REST API', icon: '🔌', color: '#4F46E5', bg: 'rgba(79,70,229,0.08)', category: 'Backend' },
  { name: 'JWT', icon: '🔐', color: '#D63AFF', bg: 'rgba(214,58,255,0.08)', category: 'Security' },
  { name: 'Cloudinary', icon: '☁️', color: '#3448C5', bg: 'rgba(52,72,197,0.08)', category: 'Cloud' },
  { name: 'AI APIs', icon: '🤖', color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', category: 'AI', wide: true },
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap?.registerPlugin(ScrollTrigger);

      gsap?.fromTo(
        titleRef?.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef?.current, start: 'top 85%' },
        }
      );

      const cards = gridRef?.current?.querySelectorAll('.tech-card');
      if (cards) {
        gsap?.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: gridRef?.current, start: 'top 80%' },
          }
        );
      }
    };
    init();
  }, []);

  const regularCards = techStack?.filter((t) => !t?.wide);
  const wideCard = techStack?.find((t) => t?.wide);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden"
    >
      <div
        className="blob-accent absolute pointer-events-none"
        style={{ width: '400px', height: '400px', left: '-5%', bottom: '10%', opacity: 0.6 }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Tech Stack
            </span>
            <h2 className="text-section-title font-extrabold text-foreground tracking-tight leading-tight">
              Tools I build
              <br />
              <span className="gradient-text">great things with.</span>
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-sm leading-relaxed">
            A curated set of technologies I use to build production-ready, scalable applications.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* col-1: React cs-1 */}
          {/* col-2: Node cs-1 */}
          {/* col-3: Express cs-1 */}
          {/* col-4: MongoDB cs-1 */}
          {/* col-1: MySQL cs-1 */}
          {/* col-2: JavaScript cs-1 */}
          {/* col-3: Tailwind cs-1 */}
          {/* col-4: Git cs-1 */}
          {/* col-1: GitHub cs-1 */}
          {/* col-2: REST API cs-1 */}
          {/* col-3: JWT cs-1 */}
          {/* col-4: Cloudinary cs-1 */}
          {regularCards?.map((tech) => (
            <div
              key={tech?.name}
              className="tech-card tech-card-hover glass-card rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default group relative overflow-hidden"
              style={{ background: tech?.bg }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${tech?.color}15 0%, transparent 70%)`,
                }}
              />
              <div className="text-3xl">{tech?.icon}</div>
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{tech?.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{tech?.category}</p>
              </div>
              <div
                className="h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${tech?.color}, transparent)` }}
              />
            </div>
          ))}

          {/* col-1: AI APIs cs-4 (full row) */}
          {wideCard && (
            <div
              className="tech-card tech-card-hover glass-card rounded-2xl p-6 col-span-2 sm:col-span-3 md:col-span-4 flex items-center gap-6 cursor-default group relative overflow-hidden"
              style={{ background: wideCard?.bg }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 20% 50%, ${wideCard?.color}12 0%, transparent 60%)`,
                }}
              />
              <div className="text-4xl flex-shrink-0">{wideCard?.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <p className="text-base font-bold text-foreground">{wideCard?.name}</p>
                  <span className="tag-pill-accent text-xs font-semibold px-3 py-0.5 rounded-full">
                    {wideCard?.category}
                  </span>
                  <span className="tag-pill text-xs font-semibold px-3 py-0.5 rounded-full">
                    Learning
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  OpenAI · Gemini · Hugging Face · LangChain — integrating intelligent features into web applications
                </p>
              </div>
              <div className="hidden md:flex gap-3 flex-shrink-0">
                {['OpenAI', 'Gemini', 'HuggingFace']?.map((api) => (
                  <span key={api} className="text-xs font-medium tag-pill-accent px-3 py-1.5 rounded-full">
                    {api}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="divider-gradient mt-20" />
      </div>
    </section>
  );
}
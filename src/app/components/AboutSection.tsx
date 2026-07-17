'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const timelineItems = [
{
  year: '2023',
  title: 'Started the Journey',
  description:
  'Discovered programming and fell in love with web development. Began learning HTML, CSS, and JavaScript fundamentals.',
  icon: '🚀',
  type: 'education'
},
{
  year: '2024',
  title: 'MERN Stack Mastery',
  description:
  'Deep-dived into React, Node.js, Express, and MongoDB. Built first full-stack projects including Wanderlust — a complete travel platform.',
  icon: '⚡',
  type: 'milestone'
},
{
  year: '2025',
  title: 'Full Stack Developer',
  description:
  'Officially became a Full Stack MERN Developer. Started integrating AI APIs and Machine Learning into web applications.',
  icon: '🎯',
  type: 'current'
},
{
  year: '2026',
  title: 'AI Integration & Growth',
  description:
  'Building AI-powered SaaS products. Learning advanced system design, cloud architecture, and production deployment.',
  icon: '🤖',
  type: 'current'
},
{
  year: 'Future',
  title: 'Software Engineer @ Scale',
  description:
  'Goal: Join a top-tier tech company or build a successful SaaS product that impacts millions of users worldwide.',
  icon: '🌟',
  type: 'future'
}];


export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: {
            trigger: titleRef?.current,
            start: 'top 85%'
          }
        }
      );

      gsap?.fromTo(
        profileRef?.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: profileRef?.current,
            start: 'top 80%'
          }
        }
      );

      const items = timelineRef?.current?.querySelectorAll('.timeline-item');
      if (items) {
        gsap?.fromTo(
          items,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef?.current,
              start: 'top 75%'
            }
          }
        );
      }
    };
    init();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden">
      
      {/* Background accent */}
      <div
        className="blob-primary absolute pointer-events-none"
        style={{ width: '500px', height: '500px', right: '-10%', top: '10%', opacity: 0.5 }}
        aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            About Me
          </span>
          <h2 className="text-section-title font-extrabold text-foreground tracking-tight leading-tight">
            The story behind
            <br />
            <span className="gradient-text">the developer.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Profile */}
          <div ref={profileRef} className="lg:col-span-4 flex flex-col gap-6">
            {/* Avatar card */}
            <div className="glass-card-strong rounded-3xl p-6 flex flex-col items-center gap-5">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1d4884314-1763296936686.png"
                  alt="Arshil - Full Stack MERN Developer, professional headshot in casual attire against light background"
                  fill
                  className="object-cover"
                  priority />
                
                <div className="absolute inset-0 gradient-border rounded-2xl pointer-events-none" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">Arshil</h3>
                <p className="text-sm text-muted-foreground mt-1">Full Stack MERN Developer</p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">Open to opportunities</span>
                </div>
              </div>
            </div>

            {/* Info cards */}
            <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
              {[
              { icon: '📍', label: 'Location', value: 'India' },
              { icon: '🎓', label: 'Education', value: 'Computer Science' },
              { icon: '💼', label: 'Focus', value: 'MERN + AI' },
              { icon: '🌐', label: 'Languages', value: 'JS, Python' }]?.
              map(({ icon, label, value }) =>
              <div key={label} className="flex items-center gap-3">
                  <span className="text-lg">{icon}</span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold text-foreground">{value}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Short story */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                I&apos;m a passionate developer who loves turning ideas into reality through clean
                code and thoughtful design. I believe in writing code that not only works but
                tells a story.
              </p>
            </div>
          </div>

          {/* Right: Timeline */}
          <div ref={timelineRef} className="lg:col-span-8 relative">
            {/* Timeline line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 timeline-line rounded-full"
              style={{ zIndex: 0 }} />
            

            <div className="flex flex-col gap-8">
              {timelineItems?.map((item, i) =>
              <div
                key={i}
                className="timeline-item relative flex gap-6 pl-16"
                style={{ opacity: 1 }}>
                
                  {/* Dot */}
                  <div
                  className={`absolute left-0 top-1 w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 flex-shrink-0 ${
                  item?.type === 'future' ? 'glass-card border-2 border-dashed border-primary/40' :
                  item?.type === 'current' ? 'gradient-bg shadow-glow-primary' : 'glass-card-strong border border-border'}`
                  }>
                  
                    {item?.icon}
                  </div>

                  {/* Content */}
                  <div
                  className={`glass-card rounded-2xl p-6 flex-1 ${
                  item?.type === 'current' ? 'border border-primary/20' : ''}`
                  }>
                  
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        item?.type === 'future' ? 'tag-pill-accent' :
                        item?.type === 'current' ? 'tag-pill' : 'bg-muted text-muted-foreground'}`
                        }>
                        
                          {item?.year}
                        </span>
                      </div>
                      {item?.type === 'current' &&
                    <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-green-600 font-medium">Present</span>
                        </div>
                    }
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item?.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item?.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}
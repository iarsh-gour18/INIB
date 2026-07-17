'use client';
import React, { useEffect, useRef, useState } from 'react';

const generateContributions = () => {
  const weeks = 52;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const rand = Math.random();
      week.push(rand < 0.35 ? 0 : rand < 0.55 ? 1 : rand < 0.75 ? 2 : rand < 0.90 ? 3 : 4);
    }
    data.push(week);
  }
  return data;
};

const getLevelColor = (level: number) => {
  switch (level) {
    case 0: return 'bg-border';
    case 1: return 'bg-primary/25';
    case 2: return 'bg-primary/50';
    case 3: return 'bg-primary/75';
    case 4: return 'bg-primary';
    default: return 'bg-border';
  }
};

const topLanguages = [
  { name: 'JavaScript', percent: 45, color: '#F7DF1E' },
  { name: 'Python', percent: 25, color: '#3776AB' },
  { name: 'TypeScript', percent: 18, color: '#3178C6' },
  { name: 'CSS', percent: 8, color: '#06B6D4' },
  { name: 'HTML', percent: 4, color: '#E34F26' },
];

const statsCards = [
  { label: 'Total Commits', value: 342, suffix: '', icon: '📦' },
  { label: 'Repositories', value: 18, suffix: '+', icon: '🗂️' },
  { label: 'Pull Requests', value: 47, suffix: '', icon: '🔀' },
  { label: 'Stars Earned', value: 124, suffix: '', icon: '⭐' },
];

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ stat }: { stat: typeof statsCards[0] }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <div ref={ref} className="glass-card rounded-2xl p-6 flex flex-col gap-3 hover:shadow-glass-lg transition-shadow">
      <div className="text-2xl">{stat.icon}</div>
      <div className="text-3xl font-extrabold gradient-text stat-counter">
        {count}{stat.suffix}
      </div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
    </div>
  );
}

export default function GitHubSection() {
  const [contributions, setContributions] = useState<number[][]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContributions(generateContributions());
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

      gsap.fromTo(
        graphRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: graphRef.current, start: 'top 80%' },
        }
      );
    };
    init();
  }, []);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden"
    >
      <div
        className="blob-accent absolute pointer-events-none"
        style={{ width: '450px', height: '450px', right: '-5%', top: '20%', opacity: 0.5 }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            GitHub Activity
          </span>
          <h2 className="text-section-title font-extrabold text-foreground tracking-tight leading-tight">
            Code speaks
            <br />
            <span className="gradient-text">louder than words.</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statsCards.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Contribution graph */}
        <div ref={graphRef} className="glass-card-strong rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-foreground">Contribution Activity</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={`w-3 h-3 rounded-sm ${getLevelColor(l)}`} />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Graph */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1" style={{ minWidth: '680px' }}>
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={`contribution-cell w-3 h-3 rounded-sm ${getLevelColor(day)}`}
                      title={`Level ${day}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            342 contributions in the last year
          </p>
        </div>

        {/* Languages & profile link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Languages */}
          <div className="glass-card-strong rounded-3xl p-6 md:p-8">
            <h3 className="text-base font-bold text-foreground mb-6">Top Languages</h3>
            <div className="flex flex-col gap-4">
              {topLanguages.map((lang) => (
                <div key={lang.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: lang.color }} />
                      <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">{lang.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${lang.percent}%`, background: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub profile CTA */}
          <div
            className="glass-card-strong rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(6,182,212,0.06) 100%)' }}
          >
            <div
              className="blob-primary absolute pointer-events-none"
              style={{ width: '300px', height: '300px', right: '-20%', bottom: '-20%', opacity: 0.4 }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">@arshil on GitHub</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Explore all my repositories, open-source contributions, and projects on GitHub.
              </p>
            </div>
            <a
              href="https://github.com/arshil"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn glow-primary relative z-10 w-full py-3.5 rounded-xl gradient-bg text-white text-sm font-semibold text-center block"
            >
              View GitHub Profile →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
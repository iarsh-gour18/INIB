'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const projects = [
{
  id: 1,
  title: 'Wanderlust',
  subtitle: 'Full Stack Travel Platform',
  description:
  'A production-ready travel listing platform with full CRUD, authentication, Cloudinary media management, interactive Mapbox maps, review system with star ratings, and advanced search & filter functionality.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_199320614-1772148386091.png",
  imageAlt: 'Scenic mountain landscape travel destination with clear blue sky and green valleys',
  tags: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'Mapbox', 'JWT'],
  features: ['Authentication & Authorization', 'Cloudinary CDN', 'Interactive Maps', 'Review System', 'Search & Filters', 'Responsive Design'],
  github: 'https://github.com/arshil/wanderlust',
  live: 'https://wanderlust-demo.vercel.app',
  status: 'Completed',
  statusColor: 'bg-green-500',
  gradient: 'from-indigo-500/20 to-cyan-500/20',
  featured: true
},
{
  id: 2,
  title: 'House Price Prediction',
  subtitle: 'ML-Powered Web App',
  description:
  'A machine learning application using Python and scikit-learn to predict house prices with Linear Regression. Features interactive data visualization, model accuracy metrics, and a clean web interface.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d6ffde07-1768546856553.png",
  imageAlt: 'Modern suburban house with green lawn in daylight, bright exterior white walls',
  tags: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'Flask', 'Regression'],
  features: ['Linear Regression', 'Data Visualization', 'Model Accuracy', 'Feature Engineering', 'Interactive UI'],
  github: 'https://github.com/arshil/house-price-ml',
  live: '#',
  status: 'Completed',
  statusColor: 'bg-blue-500',
  gradient: 'from-blue-500/20 to-purple-500/20',
  featured: false
},
{
  id: 3,
  title: 'AI SaaS Platform',
  subtitle: 'Coming Soon',
  description:
  'An upcoming AI-powered SaaS product. Currently in active development — integrating GPT-4, real-time collaboration, and a subscription billing system. Stay tuned for the launch.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15afdb008-1772093387845.png",
  imageAlt: 'Futuristic digital interface with glowing blue AI neural network visualization on dark background',
  tags: ['Next.js', 'OpenAI', 'Stripe', 'Supabase', 'TypeScript'],
  features: ['GPT-4 Integration', 'Real-time Collab', 'Stripe Billing', 'Auth System', 'Dashboard'],
  github: '#',
  live: '#',
  status: 'In Progress',
  statusColor: 'bg-amber-500',
  gradient: 'from-purple-500/20 to-cyan-500/20',
  featured: false
}];


export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
          scrollTrigger: { trigger: titleRef?.current, start: 'top 85%' }
        }
      );

      const cards = cardsRef?.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap?.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef?.current, start: 'top 80%' }
          }
        );
      }
    };
    init();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden">
      
      <div
        className="blob-primary absolute pointer-events-none"
        style={{ width: '500px', height: '500px', right: '-10%', bottom: '5%', opacity: 0.4 }}
        aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Featured Projects
            </span>
            <h2 className="text-section-title font-extrabold text-foreground tracking-tight leading-tight">
              Things I&apos;ve
              <br />
              <span className="gradient-text">actually built.</span>
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-sm leading-relaxed">
            Real-world applications built from scratch — each one a learning milestone.
          </p>
        </div>

        <div ref={cardsRef} className="flex flex-col gap-8">
          {projects?.map((project, i) =>
          <div
            key={project?.id}
            className={`project-card project-card-hover glass-card-strong rounded-3xl overflow-hidden border ${
            project?.featured ? 'border-primary/20' : 'border-border/50'} ${
            project?.featured ? 'shadow-glass-lg' : 'shadow-glass'}`}
            onMouseEnter={() => setHoveredProject(project?.id)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{ opacity: 1 }}>
            
              <div className={`grid grid-cols-1 ${i % 2 === 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-5 lg:flex-row-reverse'} gap-0`}>
                {/* Image */}
                <div
                className={`relative h-64 lg:h-auto overflow-hidden ${
                i % 2 === 0 ? 'lg:col-span-3' : 'lg:col-span-2 lg:order-last'}`
                }
                style={{ minHeight: '280px' }}>
                
                  <AppImage
                  src={project?.image}
                  alt={project?.imageAlt}
                  fill
                  className="object-cover project-img-zoom"
                  sizes="(max-width: 1024px) 100vw, 60vw" />
                
                  {/* Gradient overlay */}
                  <div className={`project-overlay absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent`} />

                  {/* Status badge */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-2 glass-card px-3 py-1.5 rounded-full">
                    <div className={`w-2 h-2 rounded-full ${project?.statusColor} animate-pulse`} />
                    <span className="text-xs font-semibold text-foreground">{project?.status}</span>
                  </div>

                  {/* Featured badge */}
                  {project?.featured &&
                <div className="absolute top-5 right-5 z-10 gradient-bg px-3 py-1.5 rounded-full">
                      <span className="text-xs font-bold text-white">⭐ Featured</span>
                    </div>
                }

                  {/* Hover overlay CTA */}
                  <div
                  className={`absolute inset-0 flex items-end p-6 z-10 transition-opacity duration-300 ${
                  hoveredProject === project?.id ? 'opacity-100' : 'opacity-0'}`
                  }>
                  
                    <div className="flex gap-3">
                      <a
                      href={project?.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-white text-foreground text-xs font-bold hover:bg-primary hover:text-white transition-colors">
                      
                        Live Demo →
                      </a>
                      <a
                      href={project?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full glass-card border border-white/30 text-white text-xs font-bold hover:bg-white/20 transition-colors">
                      
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                className={`p-8 lg:p-10 flex flex-col justify-between ${
                i % 2 === 0 ? 'lg:col-span-2' : 'lg:col-span-3 lg:order-first'}`
                }>
                
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {String(i + 1)?.padStart(2, '0')} /
                      </span>
                      <span className="text-xs font-semibold text-primary">{project?.subtitle}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 tracking-tight">
                      {project?.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {project?.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project?.features?.map((f) =>
                    <span key={f} className="text-xs font-medium tag-pill px-2.5 py-1 rounded-full">
                          {f}
                        </span>
                    )}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project?.tags?.map((tag) =>
                    <span
                      key={tag}
                      className="text-xs font-semibold bg-muted text-muted-foreground px-2.5 py-1 rounded-lg">
                      
                          {tag}
                        </span>
                    )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 mt-8 pt-6 border-t border-border/50">
                    <a
                    href={project?.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-btn glow-primary flex-1 py-3 rounded-xl gradient-bg text-white text-sm font-semibold text-center transition-all">
                    
                      {project?.status === 'In Progress' ? 'Coming Soon' : 'Live Demo'}
                    </a>
                    <a
                    href={project?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-btn px-5 py-3 rounded-xl glass-card border border-border text-foreground text-sm font-semibold hover:bg-muted transition-all">
                    
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}
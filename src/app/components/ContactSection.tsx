'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const socials = [
  {
    name: 'GitHub',
    handle: '@arshil',
    href: 'https://github.com/iarsh-gour18',
    icon: 'CodeBracketIcon',
    color: '#333333',
    bg: 'rgba(51,51,51,0.08)',
  },
  {
    name: 'LinkedIn',
    handle: 'Arshil',
    href: 'https://www.linkedin.com/in/arshil-gour-315564327/',
    icon: 'BriefcaseIcon',
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.08)',
  },
  {
    name: 'Email',
    handle: 'arshilg82@email.com',
    href: 'mailto:arshilg82@email.com',
    icon: 'EnvelopeIcon',
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.08)',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        socialsRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: socialsRef.current, start: 'top 80%' },
        }
      );
    };
    init();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.message.trim() || form.message.length < 20)
      e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');
    // Mock submit — connect to backend/email service here
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden"
    >
      <div
        className="blob-primary absolute pointer-events-none"
        style={{ width: '600px', height: '600px', left: '-10%', bottom: '-10%', opacity: 0.35 }}
        aria-hidden="true"
      />
      <div
        className="blob-accent absolute pointer-events-none"
        style={{ width: '400px', height: '400px', right: '-5%', top: '10%', opacity: 0.3 }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            Contact
          </span>
          <h2 className="text-section-title font-extrabold text-foreground tracking-tight leading-tight">
            Let&apos;s build something
            <br />
            <span className="gradient-text">remarkable together.</span>
          </h2>
          <p className="text-base text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3" style={{ opacity: 1 }}>
            <div className="glass-card-strong rounded-3xl p-8 md:p-10">
              <h3 className="text-xl font-bold text-foreground mb-8">Send a Message</h3>

              {status === 'sent' ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🎉</div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-sm text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-3 rounded-xl gradient-bg text-white text-sm font-semibold"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Arshil"
                        className={`form-input-focus w-full rounded-xl px-4 py-3.5 bg-muted text-foreground text-sm placeholder:text-muted-foreground/50 ${
                          errors.name ? 'border-red-400' : ''
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="hello@example.com"
                        className={`form-input-focus w-full rounded-xl px-4 py-3.5 bg-muted text-foreground text-sm placeholder:text-muted-foreground/50 ${
                          errors.email ? 'border-red-400' : ''
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Project Inquiry / Job Opportunity"
                      className="form-input-focus w-full rounded-xl px-4 py-3.5 bg-muted text-foreground text-sm placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      className={`form-input-focus w-full rounded-xl px-4 py-3.5 bg-muted text-foreground text-sm placeholder:text-muted-foreground/50 resize-none ${
                        errors.message ? 'border-red-400' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="magnetic-btn glow-primary w-full py-4 rounded-xl gradient-bg text-white font-bold text-sm relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    onMouseDown={(e) => {
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
                    }}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Info + Socials */}
          <div ref={socialsRef} className="lg:col-span-2 flex flex-col gap-6" style={{ opacity: 1 }}>
            {/* Availability card */}
            <div
              className="glass-card-strong rounded-3xl p-6 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(6,182,212,0.06) 100%)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-green-600">Available for work</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Open to Opportunities</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Looking for full-time roles, freelance projects, or interesting collaborations. Response within 24 hours.
              </p>
            </div>

            {/* Social links */}
            <div className="glass-card-strong rounded-3xl p-6">
              <h3 className="text-base font-bold text-foreground mb-5">Connect With Me</h3>
              <div className="flex flex-col gap-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.name !== 'Email' ? '_blank' : undefined}
                    rel={s.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="social-icon-btn flex items-center gap-4 p-4 rounded-2xl hover:shadow-glass transition-all"
                    style={{ background: s.bg }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                    >
                      <Icon name={s.icon as 'CodeBracketIcon'} size={20} className="text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{s.handle}</p>
                    </div>
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex flex-col gap-3">
                {[
                  { icon: '⚡', text: 'Quick responder — usually within 24h' },
                  { icon: '🌍', text: 'Open to remote & hybrid roles' },
                  { icon: '💡', text: 'Loves interesting technical challenges' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <p className="text-xs text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
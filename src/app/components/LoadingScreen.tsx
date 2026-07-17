'use client';
import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setVisible(false), 200);
          return 100;
        }
        return p + 4;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="loading-screen flex-col gap-6"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="text-2xl font-bold gradient-text tracking-tight">
          Arshil
        </div>
        <div className="text-xs text-muted-foreground tracking-widest uppercase">
          Portfolio
        </div>
      </div>
      <div className="w-48 h-0.5 bg-border rounded-full overflow-hidden">
        <div
          className="loading-bar h-full"
          style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
        />
      </div>
    </div>
  );
}
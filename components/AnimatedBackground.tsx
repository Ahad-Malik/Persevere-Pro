'use client';

import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#39FF14', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#32D811', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)">
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
        </rect>
        {[...Array(50)].map((_, i) => (
          <circle
            key={i}
            r={Math.random() * 2 + 1}
            fill="#39FF14"
            opacity={Math.random() * 0.5 + 0.1}
          >
            <animate
              attributeName="cx"
              values={`${Math.random() * 100}%;${Math.random() * 100}%;${Math.random() * 100}%`}
              dur={`${Math.random() * 60 + 30}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${Math.random() * 100}%;${Math.random() * 100}%;${Math.random() * 100}%`}
              dur={`${Math.random() * 60 + 30}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={Math.random() * 3 + 2 + 's'}
              repeatCount="indefinite"
              begin={Math.random() * 2 + 's'}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;
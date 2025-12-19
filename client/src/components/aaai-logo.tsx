import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function AAI_Logo({ size = 40, className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 60 60" 
          className="drop-shadow-lg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background Circle */}
          <circle 
            cx="30" 
            cy="30" 
            r="28" 
            fill="url(#brainGradient)" 
            filter="url(#glow)"
            className="animate-pulse"
          />
          
          {/* Neural Network Nodes */}
          <g fill="white" opacity="0.9">
            {/* Top Layer */}
            <circle cx="20" cy="15" r="2.5" />
            <circle cx="30" cy="12" r="2.5" />
            <circle cx="40" cy="15" r="2.5" />
            
            {/* Middle Layer */}
            <circle cx="15" cy="25" r="2.5" />
            <circle cx="30" cy="25" r="3" />
            <circle cx="45" cy="25" r="2.5" />
            
            {/* Bottom Layer */}
            <circle cx="18" cy="38" r="2.5" />
            <circle cx="30" cy="40" r="2.5" />
            <circle cx="42" cy="38" r="2.5" />
          </g>
          
          {/* Neural Network Connections */}
          <g stroke="white" strokeWidth="1.5" opacity="0.7" fill="none">
            {/* Top to Middle */}
            <line x1="20" y1="15" x2="15" y2="25" />
            <line x1="20" y1="15" x2="30" y2="25" />
            <line x1="30" y1="12" x2="15" y2="25" />
            <line x1="30" y1="12" x2="30" y2="25" />
            <line x1="30" y1="12" x2="45" y2="25" />
            <line x1="40" y1="15" x2="30" y2="25" />
            <line x1="40" y1="15" x2="45" y2="25" />
            
            {/* Middle to Bottom */}
            <line x1="15" y1="25" x2="18" y2="38" />
            <line x1="15" y1="25" x2="30" y2="40" />
            <line x1="30" y1="25" x2="18" y2="38" />
            <line x1="30" y1="25" x2="30" y2="40" />
            <line x1="30" y1="25" x2="42" y2="38" />
            <line x1="45" y1="25" x2="30" y2="40" />
            <line x1="45" y1="25" x2="42" y2="38" />
          </g>
          
          {/* Central AI Symbol */}
          <g fill="white" opacity="0.9">
            <text 
              x="30" 
              y="32" 
              fontSize="8" 
              fontWeight="bold" 
              textAnchor="middle" 
              fontFamily="Arial, sans-serif"
            >
              AI
            </text>
          </g>
          
          {/* Orbiting Particles */}
          <g fill="url(#circuitGradient)" opacity="0.8">
            <circle cx="12" cy="12" r="1.5" className="animate-spin-slow" />
            <circle cx="48" cy="12" r="1.5" className="animate-spin-slow" />
            <circle cx="12" cy="48" r="1.5" className="animate-spin-slow" />
            <circle cx="48" cy="48" r="1.5" className="animate-spin-slow" />
          </g>
        </svg>
        
        {/* Floating Animation Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1 left-1 w-1 h-1 bg-blue-400 rounded-full animate-float-1"></div>
          <div className="absolute top-2 right-1 w-1 h-1 bg-purple-400 rounded-full animate-float-2"></div>
          <div className="absolute bottom-1 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-float-3"></div>
        </div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            AAAI
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
            Anytime Anywhere AI
          </p>
        </div>
      )}
    </div>
  );
}

export default AAI_Logo;
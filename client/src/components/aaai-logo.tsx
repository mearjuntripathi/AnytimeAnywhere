import React from 'react';
import logo from '../image/android-chrome-512x512.png'

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
        <img
  src={logo}
  style={{ width: size, height: size }}
  className="object-contain"
  alt="logo"
/>
        
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
            RTPR
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
            AI PathShala
          </p>
        </div>
      )}
    </div>
  );
}

export default AAI_Logo;
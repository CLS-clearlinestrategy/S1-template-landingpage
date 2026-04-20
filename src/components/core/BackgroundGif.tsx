import { cn } from '@/lib/utils';
import React from 'react';
import { siteConfig } from '@/config/siteConfig';

export interface BackgroundGifProps {
  gifUrl?: string;
  overlayColor?: string;
  blur?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundGif({
  gifUrl = siteConfig.backgroundGif.gifUrl,
  overlayColor = siteConfig.backgroundGif.overlayColor, 
  blur = siteConfig.backgroundGif.blur,
  className,
  children
}: BackgroundGifProps) {
  return (
    <>
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div 
        className={cn("absolute -inset-[10%] bg-cover bg-center bg-no-repeat", blur)}
        style={{ 
          backgroundImage: `url(${gifUrl})`,
        }}
      />
        <div className={cn("absolute inset-0", overlayColor)} />
      </div>
      {children}
    </>
  );
}

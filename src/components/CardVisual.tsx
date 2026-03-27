
import React from 'react';
import { CardConfig } from '../types';

interface CardVisualProps {
  config: CardConfig;
  className?: string;
}

const THEME_MAP: Record<string, string> = {
  'Birthday': 'bg-pastel-pink',
  'Minimal': 'bg-pastel-ivory',
  'Floral': 'bg-pastel-mint',
  'Cute': 'bg-pastel-lavender',
};

export const CardVisual: React.FC<CardVisualProps> = ({ config, className = "" }) => {
  const themeClass = THEME_MAP[config.template] || 'bg-white';

  return (
    <div className={`relative w-full max-w-sm aspect-[3/4] p-8 rounded-lg pastel-shadow border border-white/50 flex flex-col ${themeClass} ${className}`}>
      {/* Decorative elements based on template */}
      {config.template === 'Birthday' && (
        <div className="absolute top-4 right-4 text-2xl">🎈</div>
      )}
      {config.template === 'Floral' && (
        <div className="absolute bottom-4 left-4 text-2xl opacity-40">🌸</div>
      )}
      {config.template === 'Cute' && (
        <div className="absolute top-4 left-4 text-2xl">✨</div>
      )}

      <div 
        className={`flex-1 flex flex-col justify-center ${config.alignment === 'center' ? 'items-center text-center' : config.alignment === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
        style={{ fontFamily: config.fontStyle === 'Handwritten' ? 'Dancing Script' : 'Inter' }}
      >
        <p className="text-muted-charcoal whitespace-pre-wrap leading-relaxed text-lg italic">
          {config.message || "Your message here..."}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-muted-charcoal/10 text-[10px] uppercase tracking-widest opacity-40 text-center">
        Made with Love
      </div>
    </div>
  );
};

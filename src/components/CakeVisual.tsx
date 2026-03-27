
import React from 'react';
import { motion } from 'motion/react';
import { CakeConfig, Topping } from '../types';

interface CakeVisualProps {
  config: CakeConfig;
  className?: string;
  onPlaceTopping?: (x: number, y: number) => void;
  isInteractive?: boolean;
}

const COLOR_MAP: Record<string, string> = {
  'Pastel Pink': '#F8BBD0',
  'Chocolate Brown': '#8D6E63',
  'Pastel Yellow': '#FFF59D',
  'Pastel Purple': '#D1C4E9',
  'Dark Pink': '#F06292',
  'Dark Brown': '#5D4037',
  'Dark Yellow': '#FBC02D',
  'Dark Purple': '#9575CD',
};

const SIZE_SCALE: Record<string, number> = {
  'Small': 0.8,
  'Medium': 1,
  'Large': 1.2,
};

export const CakeVisual: React.FC<CakeVisualProps> = ({ config, className = "", onPlaceTopping, isInteractive = false }) => {
  const cakeColor = COLOR_MAP[config.color];
  const creamColor = COLOR_MAP[config.creamColor];
  const scale = SIZE_SCALE[config.size];

  const handleCakeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !onPlaceTopping) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPlaceTopping(x, y);
  };

  const renderTopping = (topping: Topping, id?: string) => {
    switch (topping) {
      case 'Blueberries':
        return <div key={id} className="w-4 h-4 bg-blue-950 rounded-full shadow-md" style={{ background: 'radial-gradient(circle at 30% 30%, #283593, #1a237e)' }} />;
      case 'Rainbow Sprinkles':
        return <div key={id} className="w-1.5 h-4 rounded-full shadow-sm rotate-45" style={{ backgroundColor: '#FF8A80' }} />;
      case 'Chocolate Pieces':
        return <div key={id} className="w-5 h-5 bg-amber-950 rounded-sm rotate-12 shadow-sm" style={{ background: 'linear-gradient(135deg, #5d4037, #3e2723)' }} />;
      case 'White Candles':
        return (
          <div key={id} className="w-2 h-10 bg-white relative shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full blur-[1px]" />
          </div>
        );
      case 'Strawberries':
        return (
          <div key={id} className="relative w-10 h-10">
            {/* Strawberry Body */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full" style={{ clipPath: 'polygon(50% 100%, 100% 30%, 80% 0%, 20% 0%, 0% 30%)' }} />
            {/* Leaves */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-0.5">
              <div className="w-3 h-4 bg-green-600 rounded-full -rotate-45 origin-bottom" />
              <div className="w-3 h-4 bg-green-600 rounded-full origin-bottom" />
              <div className="w-3 h-4 bg-green-600 rounded-full rotate-45 origin-bottom" />
            </div>
            {/* Seeds */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 grid grid-cols-2 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-60" />)}
            </div>
          </div>
        );
      case 'Mint Leaves':
        return (
          <div key={id} className="relative w-8 h-8 flex gap-0.5 items-center justify-center">
            <div className="w-4 h-6 bg-green-500 rounded-full rotate-45 shadow-sm" style={{ clipPath: 'ellipse(50% 50% at 50% 50%)' }} />
            <div className="w-4 h-6 bg-green-600 rounded-full -rotate-45 shadow-sm" style={{ clipPath: 'ellipse(50% 50% at 50% 50%)' }} />
          </div>
        );
      default:
        return null;
    }
  };

  const renderCake = () => {
    return (
      <div className={`relative w-full h-96 flex items-center justify-center`}>
        <motion.div 
          className={`relative w-80 h-80 flex flex-col items-center justify-end pb-10 ${isInteractive ? 'cursor-crosshair' : ''}`}
          style={{ scale }}
          onClick={handleCakeClick}
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Dark Base */}
          <div className="absolute bottom-6 w-64 h-4 bg-[#3E2723] rounded-sm z-0 shadow-lg" />

          {/* Bottom Layer */}
          <div 
            className="w-60 h-24 relative z-10"
            style={{ backgroundColor: cakeColor, borderRadius: '4px 4px 0 0' }}
          >
            {/* Middle Frosting (Wavy) */}
            <div 
              className="absolute -top-4 left-0 w-full h-12 z-20"
              style={{ 
                backgroundColor: creamColor,
                borderRadius: '50% 50% 0 0 / 20% 20% 0 0',
                clipPath: 'polygon(0% 20%, 10% 0%, 20% 20%, 30% 0%, 40% 20%, 50% 0%, 60% 20%, 70% 0%, 80% 20%, 90% 0%, 100% 20%, 100% 100%, 0% 100%)'
              }}
            />
          </div>

          {/* Top Layer */}
          <div 
            className="w-60 h-24 relative z-30"
            style={{ backgroundColor: cakeColor, borderRadius: '4px 4px 0 0', marginTop: '-12px' }}
          >
            {/* Top Frosting (Wavy) */}
            <div 
              className="absolute -top-6 left-0 w-full h-16 z-40"
              style={{ 
                backgroundColor: creamColor,
                borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
                clipPath: 'polygon(0% 25%, 10% 0%, 20% 25%, 30% 0%, 40% 25%, 50% 0%, 60% 25%, 70% 0%, 80% 25%, 90% 0%, 100% 25%, 100% 100%, 0% 100%)'
              }}
            >
              {/* Text on Top */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-accent text-xl text-white drop-shadow-md text-center px-4">
                  {config.text}
                </span>
              </div>
            </div>
          </div>

          {/* Placed Toppings */}
          <div className="absolute inset-0 z-50 pointer-events-none">
            {config.placedToppings.map((pt) => (
              <div 
                key={pt.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              >
                {renderTopping(pt.type)}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderCake()}
    </div>
  );
};

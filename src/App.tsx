import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, Heart, Mail, ChevronRight, ChevronLeft, Instagram, MessageCircle, CheckCircle2, Facebook, Share2, Copy, Send } from 'lucide-react';
import { AppState, CakeSize, CakeShape, CakeColor, CreamColor, Topping, CardTemplate, TextAlignment } from './types';
import { CakeVisual } from './components/CakeVisual';
import { CardVisual } from './components/CardVisual';

const INITIAL_STATE: AppState = {
  step: 'landing',
  cake: {
    size: 'Medium',
    shape: 'Round',
    color: 'Pastel Yellow',
    creamColor: 'Dark Brown',
    toppings: [],
    placedToppings: [],
    text: '',
  },
  card: {
    template: 'Birthday',
    message: '',
    fontStyle: 'Sans',
    alignment: 'center',
    theme: 'Pastel Pink',
  },
};

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateCake = (updates: Partial<AppState['cake']>) => {
    setState(prev => ({ ...prev, cake: { ...prev.cake, ...updates } }));
  };

  const updateCard = (updates: Partial<AppState['card']>) => {
    setState(prev => ({ ...prev, card: { ...prev.card, ...updates } }));
  };

  const onPlaceTopping = (x: number, y: number) => {
    if (!selectedTopping) return;
    
    const newTopping = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedTopping,
      x,
      y
    };

    updateCake({
      placedToppings: [...state.cake.placedToppings, newTopping]
    });
  };

  const removeTopping = (id: string) => {
    updateCake({
      placedToppings: state.cake.placedToppings.filter(t => t.id !== id)
    });
  };

  const toggleTopping = (topping: Topping) => {
    setSelectedTopping(prev => prev === topping ? null : topping);
  };

  const nextStep = () => {
    if (state.step === 'landing') setState(prev => ({ ...prev, step: 'cake' }));
    else if (state.step === 'cake') setState(prev => ({ ...prev, step: 'card' }));
    else if (state.step === 'card') setState(prev => ({ ...prev, step: 'preview' }));
  };

  const prevStep = () => {
    if (state.step === 'cake') setState(prev => ({ ...prev, step: 'landing' }));
    else if (state.step === 'card') setState(prev => ({ ...prev, step: 'cake' }));
    else if (state.step === 'preview') setState(prev => ({ ...prev, step: 'card' }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Progress */}
      {state.step !== 'landing' && (
        <header className="py-6 px-8 flex justify-between items-center bg-white/30 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setState(INITIAL_STATE)}>
            <Cake className="text-pastel-coral" size={24} />
            <span className="font-serif font-bold text-xl tracking-tight">Pastel Petals</span>
          </div>
          <div className="flex gap-4">
            {(['cake', 'card', 'preview', 'share'] as const).map((s) => (
              <div 
                key={s}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  state.step === s ? 'bg-pastel-coral w-6' : 'bg-muted-charcoal/20'
                }`}
              />
            ))}
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {state.step === 'landing' && (
            <motion.section 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden"
            >
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pastel-pink/30 rounded-full blur-3xl floating" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pastel-blue/30 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }} />
              </div>

              <h1 className="text-7xl md:text-9xl font-serif mb-6 text-muted-charcoal">Hi!!! 🎉</h1>
              <p className="text-xl md:text-2xl text-muted-charcoal/70 max-w-2xl mb-12 leading-relaxed">
                Create your perfect cake and a heartfelt card in just a few simple steps.
              </p>
              <button 
                onClick={nextStep}
                className="bg-pastel-coral text-white px-10 py-5 rounded-full text-xl font-medium pastel-shadow hover:scale-105 transition-transform active:scale-95 flex items-center gap-3"
              >
                Start Creating <ChevronRight size={24} />
              </button>
            </motion.section>
          )}

          {state.step === 'cake' && (
            <motion.section 
              key="cake"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex-1 grid lg:grid-cols-2 gap-12 p-8 lg:p-16"
            >
              {/* Preview Side */}
              <div className="flex flex-col items-center justify-center bg-white/40 rounded-3xl p-8 pastel-shadow relative">
                <h2 className="text-3xl font-serif mb-12">Design Your Cake 🎂</h2>
                <CakeVisual 
                  config={state.cake} 
                  isInteractive={true} 
                  onPlaceTopping={onPlaceTopping} 
                />
                {selectedTopping && (
                  <div className="mt-8 px-4 py-2 bg-pastel-coral text-white rounded-full text-sm animate-pulse">
                    Click on the cake to place {selectedTopping}
                  </div>
                )}
                {state.cake.placedToppings.length > 0 && (
                  <button 
                    onClick={() => updateCake({ placedToppings: [] })}
                    className="mt-4 text-xs text-muted-charcoal/40 hover:text-pastel-coral transition-colors"
                  >
                    Clear all toppings
                  </button>
                )}
              </div>

              {/* Controls Side */}
              <div className="flex flex-col gap-8 overflow-y-auto max-h-[80vh] pr-4 custom-scrollbar">
                <div className="space-y-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">Size & Shape</h3>
                  <div className="flex flex-wrap gap-3">
                    {(['Small', 'Medium', 'Large'] as CakeSize[]).map(size => (
                      <button 
                        key={size}
                        onClick={() => updateCake({ size })}
                        className={`px-6 py-2 rounded-full border transition-all ${state.cake.size === size ? 'bg-pastel-peach border-pastel-peach text-white' : 'border-muted-charcoal/10 hover:bg-white'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(['Round', 'Square'] as CakeShape[]).map(shape => (
                      <button 
                        key={shape}
                        onClick={() => updateCake({ shape })}
                        className={`px-6 py-2 rounded-full border transition-all ${state.cake.shape === shape ? 'bg-pastel-lavender border-pastel-lavender text-white' : 'border-muted-charcoal/10 hover:bg-white'}`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">Cake Color</h3>
                  <div className="flex gap-4">
                    {(['Pastel Pink', 'Chocolate Brown', 'Pastel Yellow', 'Pastel Purple'] as CakeColor[]).map(color => (
                      <button 
                        key={color}
                        onClick={() => updateCake({ color })}
                        className={`w-12 h-12 rounded-full border-4 transition-all ${state.cake.color === color ? 'border-pastel-coral scale-110' : 'border-white'}`}
                        style={{ backgroundColor: color === 'Pastel Pink' ? '#F8BBD0' : color === 'Chocolate Brown' ? '#8D6E63' : color === 'Pastel Yellow' ? '#FFF59D' : '#D1C4E9' }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">Cream Color</h3>
                  <div className="flex gap-4">
                    {(['Dark Pink', 'Dark Brown', 'Dark Yellow', 'Dark Purple'] as CreamColor[]).map(color => (
                      <button 
                        key={color}
                        onClick={() => updateCake({ creamColor: color })}
                        className={`w-10 h-10 rounded-full border-4 transition-all ${state.cake.creamColor === color ? 'border-pastel-coral scale-110' : 'border-white'}`}
                        style={{ backgroundColor: color === 'Dark Pink' ? '#F06292' : color === 'Dark Brown' ? '#5D4037' : color === 'Dark Yellow' ? '#FBC02D' : '#9575CD' }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">Toppings (Select to place)</h3>
                  <div className="flex flex-wrap gap-3">
                    {(['Blueberries', 'Rainbow Sprinkles', 'Chocolate Pieces', 'White Candles', 'Strawberries', 'Mint Leaves'] as Topping[]).map(topping => (
                      <button 
                        key={topping}
                        onClick={() => toggleTopping(topping)}
                        className={`px-6 py-2 rounded-full border transition-all ${selectedTopping === topping ? 'bg-pastel-coral border-pastel-coral text-white scale-105' : 'border-muted-charcoal/10 hover:bg-white'}`}
                      >
                        {topping}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">Custom Text</h3>
                  <input 
                    type="text"
                    value={state.cake.text}
                    onChange={(e) => updateCake({ text: e.target.value })}
                    placeholder="Happy Birthday!"
                    className="w-full p-4 rounded-xl border border-muted-charcoal/10 focus:outline-none focus:ring-2 focus:ring-pastel-coral/20 bg-white/50 font-accent text-xl"
                  />
                </div>

                <div className="pt-8 flex gap-4">
                  <button onClick={prevStep} className="flex-1 py-4 rounded-full border border-muted-charcoal/10 hover:bg-white transition-all flex items-center justify-center gap-2">
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button onClick={nextStep} className="flex-[2] py-4 rounded-full bg-pastel-coral text-white font-medium pastel-shadow hover:scale-105 transition-all flex items-center justify-center gap-2">
                    Next: Create Your Card <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {state.step === 'card' && (
            <motion.section 
              key="card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex-1 grid lg:grid-cols-2 gap-12 p-8 lg:p-16"
            >
              {/* Preview Side */}
              <div className="flex flex-col items-center justify-center bg-white/40 rounded-3xl p-8 pastel-shadow">
                <h2 className="text-3xl font-serif mb-12">Create Your Card 💌</h2>
                <CardVisual config={state.card} />
              </div>

              {/* Controls Side */}
              <div className="flex flex-col gap-8">
                <div className="space-y-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">Template</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Birthday', 'Minimal', 'Floral', 'Cute'] as CardTemplate[]).map(template => (
                      <button 
                        key={template}
                        onClick={() => updateCard({ template })}
                        className={`px-6 py-4 rounded-xl border transition-all text-left ${state.card.template === template ? 'bg-white border-pastel-coral pastel-shadow' : 'border-muted-charcoal/10 hover:bg-white'}`}
                      >
                        <span className="block font-serif text-lg">{template}</span>
                        <span className="text-xs opacity-50">Theme Style</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">Message</h3>
                    <span className="text-[10px] opacity-40">
                      {state.card.message.trim() === '' ? 0 : state.card.message.trim().split(/\s+/).length} / 300 words
                    </span>
                  </div>
                  <textarea 
                    value={state.card.message}
                    onChange={(e) => {
                      const words = e.target.value.trim().split(/\s+/);
                      if (words.length <= 300 || e.target.value.length < state.card.message.length) {
                        updateCard({ message: e.target.value });
                      }
                    }}
                    placeholder="Write your heartfelt message here..."
                    className="w-full h-48 p-6 rounded-2xl border border-muted-charcoal/10 focus:outline-none focus:ring-2 focus:ring-pastel-coral/20 bg-white/50 resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">Typography</h3>
                  <div className="flex gap-3">
                    {['Sans', 'Handwritten'].map(font => (
                      <button 
                        key={font}
                        onClick={() => updateCard({ fontStyle: font })}
                        className={`px-6 py-2 rounded-full border transition-all ${state.card.fontStyle === font ? 'bg-pastel-lavender border-pastel-lavender text-white' : 'border-muted-charcoal/10 hover:bg-white'}`}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {(['left', 'center', 'right'] as TextAlignment[]).map(align => (
                      <button 
                        key={align}
                        onClick={() => updateCard({ alignment: align })}
                        className={`px-6 py-2 rounded-full border transition-all capitalize ${state.card.alignment === align ? 'bg-pastel-mint border-pastel-mint text-white' : 'border-muted-charcoal/10 hover:bg-white'}`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex gap-4">
                  <button onClick={prevStep} className="flex-1 py-4 rounded-full border border-muted-charcoal/10 hover:bg-white transition-all flex items-center justify-center gap-2">
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button onClick={nextStep} className="flex-[2] py-4 rounded-full bg-pastel-coral text-white font-medium pastel-shadow hover:scale-105 transition-all flex items-center justify-center gap-2">
                    Finish & Preview 🎉
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {state.step === 'preview' && (
            <motion.section 
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 text-center"
            >
              <h2 className="text-5xl md:text-6xl font-serif mb-4">Your Celebration is Ready 🎂✨</h2>
              <p className="text-muted-charcoal/60 mb-16 max-w-xl">Everything looks perfect! Review your custom cake and greeting card before confirming.</p>

              <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl w-full mb-20">
                <div className="flex flex-col items-center gap-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">The Cake</h3>
                  <CakeVisual config={state.cake} className="scale-110" />
                </div>
                <div className="flex flex-col items-center gap-6">
                  <h3 className="text-sm uppercase tracking-widest opacity-50 font-sans font-bold">The Card</h3>
                  <CardVisual config={state.card} className="scale-90" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                <button 
                  onClick={() => setState(prev => ({ ...prev, step: 'cake' }))}
                  className="flex-1 py-5 rounded-full border-2 border-pastel-coral text-pastel-coral font-bold hover:bg-pastel-coral/5 transition-all"
                >
                  Edit Design
                </button>
                <button 
                  onClick={() => setState(prev => ({ ...prev, step: 'share' }))}
                  className="flex-1 py-5 rounded-full bg-pastel-coral text-white font-bold pastel-shadow hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Confirm Order <CheckCircle2 size={20} />
                </button>
              </div>
            </motion.section>
          )}
          {state.step === 'share' && (
            <motion.section 
              key="share"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 text-center"
            >
              <div className="w-24 h-24 bg-pastel-mint/20 rounded-full flex items-center justify-center mb-8 animate-bounce">
                <CheckCircle2 className="text-pastel-mint" size={48} />
              </div>
              <h2 className="text-5xl md:text-6xl font-serif mb-4">Confirmed! 🎉</h2>
              <p className="text-muted-charcoal/60 mb-12 max-w-xl">Your celebration has been created. Share the joy with your friends and family!</p>

              <div className="bg-white/40 p-10 rounded-[3rem] pastel-shadow max-w-2xl w-full">
                <h3 className="text-xl font-serif mb-8">Share the Link</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                  <a 
                    href={`https://api.whatsapp.com/send?text=Check out this celebration I created! ${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/50 transition-all group"
                  >
                    <div className="w-14 h-14 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                      <MessageCircle size={28} />
                    </div>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </a>
                  
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/50 transition-all group"
                  >
                    <div className="w-14 h-14 bg-[#1877F2]/10 rounded-full flex items-center justify-center text-[#1877F2] group-hover:scale-110 transition-transform">
                      <Facebook size={28} />
                    </div>
                    <span className="text-sm font-medium">Facebook</span>
                  </a>

                  <a 
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/50 transition-all group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-opacity-10 rounded-full flex items-center justify-center text-[#ee2a7b] group-hover:scale-110 transition-transform">
                      <Instagram size={28} />
                    </div>
                    <span className="text-sm font-medium">Instagram</span>
                  </a>

                  <button 
                    onClick={copyToClipboard}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/50 transition-all group relative"
                  >
                    <div className="w-14 h-14 bg-pastel-coral/10 rounded-full flex items-center justify-center text-pastel-coral group-hover:scale-110 transition-transform">
                      <Copy size={28} />
                    </div>
                    <span className="text-sm font-medium">Copy Link</span>
                    {copied && (
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-8 bg-muted-charcoal text-white text-[10px] px-2 py-1 rounded"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl border border-muted-charcoal/5">
                  <div className="flex-1 truncate text-left text-sm text-muted-charcoal/60 font-mono">
                    {window.location.href}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-pastel-coral/10 rounded-lg text-pastel-coral transition-colors relative"
                  >
                    <Copy size={18} />
                    {copied && (
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-8 right-0 bg-muted-charcoal text-white text-[10px] px-2 py-1 rounded"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setState(INITIAL_STATE)}
                className="mt-12 text-muted-charcoal/40 hover:text-pastel-coral transition-colors flex items-center gap-2"
              >
                Create another celebration <Send size={16} />
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-muted-charcoal/5 bg-white/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            <a href="#" className="flex items-center gap-2 text-muted-charcoal/60 hover:text-pastel-coral transition-colors">
              <Instagram size={20} /> <span>Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-muted-charcoal/60 hover:text-pastel-coral transition-colors">
              <MessageCircle size={20} /> <span>WhatsApp</span>
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <Cake className="text-pastel-coral/40" size={20} />
            <span className="font-serif text-muted-charcoal/40">© 2026 Pastel Petals</span>
          </div>

          <div className="flex gap-8 text-sm text-muted-charcoal/40">
            <a href="#" className="hover:text-muted-charcoal transition-colors">Help</a>
            <a href="#" className="hover:text-muted-charcoal transition-colors">Terms</a>
            <a href="#" className="hover:text-muted-charcoal transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

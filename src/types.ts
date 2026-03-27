
export type CakeSize = 'Small' | 'Medium' | 'Large';
export type CakeShape = 'Round' | 'Square' | 'Heart';
export type CakeColor = 'Pastel Pink' | 'Chocolate Brown' | 'Pastel Yellow' | 'Pastel Purple';
export type CreamStyle = 'Smooth' | 'Swirl' | 'Drip' | 'Piped';
export type CreamColor = 'Dark Pink' | 'Dark Brown' | 'Dark Yellow' | 'Dark Purple';
export type Topping = 'Blueberries' | 'Rainbow Sprinkles' | 'Chocolate Pieces' | 'White Candles' | 'Strawberries' | 'Mint Leaves';

export interface PlacedTopping {
  id: string;
  type: Topping;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface CakeConfig {
  size: CakeSize;
  shape: CakeShape;
  color: CakeColor;
  creamStyle: CreamStyle;
  creamColor: CreamColor;
  toppings: Topping[]; // Keep for legacy/selection
  placedToppings: PlacedTopping[];
  text: string;
}

export type CardTemplate = 'Birthday' | 'Minimal' | 'Floral' | 'Cute';
export type TextAlignment = 'left' | 'center' | 'right';

export interface CardConfig {
  template: CardTemplate;
  message: string;
  fontStyle: string;
  alignment: TextAlignment;
  theme: string;
}

export interface AppState {
  step: 'landing' | 'cake' | 'card' | 'preview';
  cake: CakeConfig;
  card: CardConfig;
}

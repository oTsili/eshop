export interface TradeNumber {
  description: string;
  code: string;
  _id: string;
}

export interface TradeNumbers {
  seasons: TradeNumber[];
  colors: TradeNumber[];
  types: TradeNumber[];
  styles: TradeNumber[];
  heels: TradeNumber[];
  sizes: TradeNumber[];
  materials: TradeNumber[];
}

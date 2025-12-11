export enum ActionType {
  DIVIDEND = 'Dividend',
  STOCK_SPLIT = 'Stock Split',
  BONUS_ISSUE = 'Bonus Issue',
  MERGER = 'Merger',
  ACQUISITION = 'Acquisition',
  RIGHTS_ISSUE = 'Rights Issue',
  SPIN_OFF = 'Spin Off'
}

export interface Company {
  ticker: string;
  name: string;
  description: string;
  sector: string;
  industry: string;
  logoUrl: string;
  marketCap: number;
  price: number;
  change: number;
  changePercent: number;
  dividendYield: number;
}

export interface CorporateAction {
  id: string;
  ticker: string;
  type: ActionType;
  date: string; // ISO Date string
  description: string;
  status: 'Upcoming' | 'Completed' | 'Announced';
  value?: string; // e.g., "$0.50/share" or "1:4"
}

export interface StockPricePoint {
  date: string;
  price: number;
  volume: number;
}

export interface Alert {
  id: string;
  ticker: string;
  condition: string;
  targetPrice?: number;
  actionType?: ActionType;
  active: boolean;
}
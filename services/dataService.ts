import { Company, CorporateAction, StockPricePoint, ActionType } from '../types';

// --- CONFIGURATION ---
const FMP_BASE_URL = 'https://financialmodelingprep.com/api/v3';
const getApiKey = () => localStorage.getItem('FMP_API_KEY') || process.env.REACT_APP_FMP_KEY || '';

// --- EXPANDED MOCK DATA GENERATION ---

// Comprehensive list of ~100+ Major US Stocks
const STOCK_DATA_SOURCE = [
  // Technology
  { t: 'AAPL', n: 'Apple Inc.', s: 'Technology', i: 'Consumer Electronics' },
  { t: 'MSFT', n: 'Microsoft Corp.', s: 'Technology', i: 'Software - Infrastructure' },
  { t: 'NVDA', n: 'NVIDIA Corp.', s: 'Technology', i: 'Semiconductors' },
  { t: 'GOOGL', n: 'Alphabet Inc.', s: 'Technology', i: 'Internet Content & Info' },
  { t: 'AMZN', n: 'Amazon.com Inc.', s: 'Consumer Cyclical', i: 'Internet Retail' },
  { t: 'META', n: 'Meta Platforms', s: 'Technology', i: 'Internet Content & Info' },
  { t: 'TSLA', n: 'Tesla Inc.', s: 'Consumer Cyclical', i: 'Auto Manufacturers' },
  { t: 'AVGO', n: 'Broadcom Inc.', s: 'Technology', i: 'Semiconductors' },
  { t: 'ORCL', n: 'Oracle Corp.', s: 'Technology', i: 'Software - Infrastructure' },
  { t: 'CRM', n: 'Salesforce Inc.', s: 'Technology', i: 'Software - Application' },
  { t: 'AMD', n: 'Advanced Micro Devices', s: 'Technology', i: 'Semiconductors' },
  { t: 'INTC', n: 'Intel Corp.', s: 'Technology', i: 'Semiconductors' },
  { t: 'QCOM', n: 'Qualcomm Inc.', s: 'Technology', i: 'Semiconductors' },
  { t: 'TXN', n: 'Texas Instruments', s: 'Technology', i: 'Semiconductors' },
  { t: 'IBM', n: 'IBM', s: 'Technology', i: 'IT Services' },
  { t: 'ADBE', n: 'Adobe Inc.', s: 'Technology', i: 'Software - Infrastructure' },
  { t: 'CSCO', n: 'Cisco Systems', s: 'Technology', i: 'Communication Equipment' },
  { t: 'NFLX', n: 'Netflix Inc.', s: 'Communication Services', i: 'Entertainment' },
  { t: 'PYPL', n: 'PayPal Holdings', s: 'Financial Services', i: 'Credit Services' },
  { t: 'INTU', n: 'Intuit Inc.', s: 'Technology', i: 'Software - Application' },
  { t: 'AMAT', n: 'Applied Materials', s: 'Technology', i: 'Semiconductor Equipment' },
  { t: 'NOW', n: 'ServiceNow', s: 'Technology', i: 'Software - Application' },
  { t: 'UBER', n: 'Uber Technologies', s: 'Technology', i: 'Software - Application' },
  { t: 'ABNB', n: 'Airbnb Inc.', s: 'Consumer Cyclical', i: 'Travel Services' },
  { t: 'PLTR', n: 'Palantir Technologies', s: 'Technology', i: 'Software - Infrastructure' },
  { t: 'SQ', n: 'Block Inc.', s: 'Technology', i: 'Software - Infrastructure' },
  { t: 'SHOP', n: 'Shopify Inc.', s: 'Technology', i: 'Software - Application' },
  { t: 'SNOW', n: 'Snowflake Inc.', s: 'Technology', i: 'Software - Application' },
  { t: 'CRWD', n: 'CrowdStrike', s: 'Technology', i: 'Software - Security' },
  { t: 'PANW', n: 'Palo Alto Networks', s: 'Technology', i: 'Software - Security' },
  { t: 'MU', n: 'Micron Technology', s: 'Technology', i: 'Semiconductors' },
  { t: 'LRCX', n: 'Lam Research', s: 'Technology', i: 'Semiconductor Equipment' },
  { t: 'ADI', n: 'Analog Devices', s: 'Technology', i: 'Semiconductors' },
  { t: 'MRVL', n: 'Marvell Technology', s: 'Technology', i: 'Semiconductors' },
  { t: 'KLAC', n: 'KLA Corp.', s: 'Technology', i: 'Semiconductor Equipment' },
  { t: 'SNPS', n: 'Synopsys Inc.', s: 'Technology', i: 'Software - Infrastructure' },
  { t: 'CDNS', n: 'Cadence Design', s: 'Technology', i: 'Software - Infrastructure' },

  // Finance
  { t: 'JPM', n: 'JPMorgan Chase', s: 'Financial Services', i: 'Banks - Diversified' },
  { t: 'BAC', n: 'Bank of America', s: 'Financial Services', i: 'Banks - Diversified' },
  { t: 'WFC', n: 'Wells Fargo', s: 'Financial Services', i: 'Banks - Diversified' },
  { t: 'C', n: 'Citigroup Inc.', s: 'Financial Services', i: 'Banks - Diversified' },
  { t: 'GS', n: 'Goldman Sachs', s: 'Financial Services', i: 'Capital Markets' },
  { t: 'MS', n: 'Morgan Stanley', s: 'Financial Services', i: 'Capital Markets' },
  { t: 'BLK', n: 'BlackRock', s: 'Financial Services', i: 'Asset Management' },
  { t: 'V', n: 'Visa Inc.', s: 'Financial Services', i: 'Credit Services' },
  { t: 'MA', n: 'Mastercard Inc.', s: 'Financial Services', i: 'Credit Services' },
  { t: 'AXP', n: 'American Express', s: 'Financial Services', i: 'Credit Services' },
  { t: 'BRK.B', n: 'Berkshire Hathaway', s: 'Financial Services', i: 'Insurance' },
  { t: 'SPGI', n: 'S&P Global', s: 'Financial Services', i: 'Financial Data' },
  { t: 'MCO', n: 'Moody\'s Corp.', s: 'Financial Services', i: 'Financial Data' },
  { t: 'MMC', n: 'Marsh & McLennan', s: 'Financial Services', i: 'Insurance Brokers' },
  { t: 'PGR', n: 'Progressive Corp.', s: 'Financial Services', i: 'Insurance' },
  { t: 'CB', n: 'Chubb Ltd.', s: 'Financial Services', i: 'Insurance' },
  { t: 'BK', n: 'BNY Mellon', s: 'Financial Services', i: 'Asset Management' },
  { t: 'USB', n: 'U.S. Bancorp', s: 'Financial Services', i: 'Banks - Regional' },
  { t: 'PNC', n: 'PNC Financial', s: 'Financial Services', i: 'Banks - Regional' },
  { t: 'TFC', n: 'Truist Financial', s: 'Financial Services', i: 'Banks - Regional' },

  // Healthcare
  { t: 'LLY', n: 'Eli Lilly and Co.', s: 'Healthcare', i: 'Drug Manufacturers' },
  { t: 'UNH', n: 'UnitedHealth Group', s: 'Healthcare', i: 'Healthcare Plans' },
  { t: 'JNJ', n: 'Johnson & Johnson', s: 'Healthcare', i: 'Drug Manufacturers' },
  { t: 'MRK', n: 'Merck & Co.', s: 'Healthcare', i: 'Drug Manufacturers' },
  { t: 'ABBV', n: 'AbbVie Inc.', s: 'Healthcare', i: 'Drug Manufacturers' },
  { t: 'PFE', n: 'Pfizer Inc.', s: 'Healthcare', i: 'Drug Manufacturers' },
  { t: 'TMO', n: 'Thermo Fisher', s: 'Healthcare', i: 'Diagnostics & Research' },
  { t: 'ABT', n: 'Abbott Laboratories', s: 'Healthcare', i: 'Medical Devices' },
  { t: 'DHR', n: 'Danaher Corp.', s: 'Healthcare', i: 'Diagnostics & Research' },
  { t: 'BMY', n: 'Bristol-Myers Squibb', s: 'Healthcare', i: 'Drug Manufacturers' },
  { t: 'AMGN', n: 'Amgen Inc.', s: 'Healthcare', i: 'Drug Manufacturers' },
  { t: 'CVS', n: 'CVS Health', s: 'Healthcare', i: 'Healthcare Plans' },
  { t: 'ELV', n: 'Elevance Health', s: 'Healthcare', i: 'Healthcare Plans' },
  { t: 'ISRG', n: 'Intuitive Surgical', s: 'Healthcare', i: 'Medical Instruments' },
  { t: 'SYK', n: 'Stryker Corp.', s: 'Healthcare', i: 'Medical Devices' },
  { t: 'REGN', n: 'Regeneron', s: 'Healthcare', i: 'Biotechnology' },
  { t: 'VRTX', n: 'Vertex Pharmaceuticals', s: 'Healthcare', i: 'Biotechnology' },
  { t: 'HCA', n: 'HCA Healthcare', s: 'Healthcare', i: 'Medical Care Facilities' },
  { t: 'MCK', n: 'McKesson Corp.', s: 'Healthcare', i: 'Medical Distribution' },

  // Consumer
  { t: 'WMT', n: 'Walmart Inc.', s: 'Consumer Defensive', i: 'Discount Stores' },
  { t: 'PG', n: 'Procter & Gamble', s: 'Consumer Defensive', i: 'Household & Personal' },
  { t: 'COST', n: 'Costco Wholesale', s: 'Consumer Defensive', i: 'Discount Stores' },
  { t: 'KO', n: 'Coca-Cola Co.', s: 'Consumer Defensive', i: 'Beverages' },
  { t: 'PEP', n: 'PepsiCo Inc.', s: 'Consumer Defensive', i: 'Beverages' },
  { t: 'HD', n: 'Home Depot', s: 'Consumer Cyclical', i: 'Home Improvement' },
  { t: 'LOW', n: 'Lowe\'s Cos.', s: 'Consumer Cyclical', i: 'Home Improvement' },
  { t: 'MCD', n: 'McDonald\'s Corp.', s: 'Consumer Cyclical', i: 'Restaurants' },
  { t: 'SBUX', n: 'Starbucks Corp.', s: 'Consumer Cyclical', i: 'Restaurants' },
  { t: 'NKE', n: 'Nike Inc.', s: 'Consumer Cyclical', i: 'Footwear & Accessories' },
  { t: 'TGT', n: 'Target Corp.', s: 'Consumer Defensive', i: 'Discount Stores' },
  { t: 'CMG', n: 'Chipotle Mexican Grill', s: 'Consumer Cyclical', i: 'Restaurants' },
  { t: 'LULU', n: 'Lululemon Athletica', s: 'Consumer Cyclical', i: 'Apparel' },
  { t: 'MAR', n: 'Marriott International', s: 'Consumer Cyclical', i: 'Lodging' },
  { t: 'HLT', n: 'Hilton Worldwide', s: 'Consumer Cyclical', i: 'Lodging' },
  { t: 'MO', n: 'Altria Group', s: 'Consumer Defensive', i: 'Tobacco' },
  { t: 'PM', n: 'Philip Morris', s: 'Consumer Defensive', i: 'Tobacco' },
  { t: 'CL', n: 'Colgate-Palmolive', s: 'Consumer Defensive', i: 'Household & Personal' },
  { t: 'GM', n: 'General Motors', s: 'Consumer Cyclical', i: 'Auto Manufacturers' },
  { t: 'F', n: 'Ford Motor Co.', s: 'Consumer Cyclical', i: 'Auto Manufacturers' },

  // Industrial & Energy
  { t: 'XOM', n: 'Exxon Mobil', s: 'Energy', i: 'Oil & Gas Integrated' },
  { t: 'CVX', n: 'Chevron Corp.', s: 'Energy', i: 'Oil & Gas Integrated' },
  { t: 'COP', n: 'ConocoPhillips', s: 'Energy', i: 'Oil & Gas E&P' },
  { t: 'SLB', n: 'Schlumberger', s: 'Energy', i: 'Oil & Gas Equipment' },
  { t: 'EOG', n: 'EOG Resources', s: 'Energy', i: 'Oil & Gas E&P' },
  { t: 'MPC', n: 'Marathon Petroleum', s: 'Energy', i: 'Oil & Gas Refining' },
  { t: 'PSX', n: 'Phillips 66', s: 'Energy', i: 'Oil & Gas Refining' },
  { t: 'GE', n: 'General Electric', s: 'Industrials', i: 'Specialty Industrial' },
  { t: 'CAT', n: 'Caterpillar Inc.', s: 'Industrials', i: 'Farm & Heavy Construction' },
  { t: 'DE', n: 'Deere & Co.', s: 'Industrials', i: 'Farm & Heavy Construction' },
  { t: 'HON', n: 'Honeywell', s: 'Industrials', i: 'Conglomerates' },
  { t: 'UNP', n: 'Union Pacific', s: 'Industrials', i: 'Railroads' },
  { t: 'UPS', n: 'United Parcel Service', s: 'Industrials', i: 'Integrated Freight' },
  { t: 'BA', n: 'Boeing Co.', s: 'Industrials', i: 'Aerospace & Defense' },
  { t: 'LMT', n: 'Lockheed Martin', s: 'Industrials', i: 'Aerospace & Defense' },
  { t: 'RTX', n: 'Raytheon Technologies', s: 'Industrials', i: 'Aerospace & Defense' },
  { t: 'GD', n: 'General Dynamics', s: 'Industrials', i: 'Aerospace & Defense' },
  { t: 'NOC', n: 'Northrop Grumman', s: 'Industrials', i: 'Aerospace & Defense' },
  { t: 'ETN', n: 'Eaton Corp.', s: 'Industrials', i: 'Specialty Industrial' },
  { t: 'ITW', n: 'Illinois Tool Works', s: 'Industrials', i: 'Specialty Industrial' },
  { t: 'WM', n: 'Waste Management', s: 'Industrials', i: 'Waste Management' },
  { t: 'FDX', n: 'FedEx Corp.', s: 'Industrials', i: 'Integrated Freight' },

  // Communication & Utilities & Real Estate
  { t: 'VZ', n: 'Verizon', s: 'Communication Services', i: 'Telecom Services' },
  { t: 'T', n: 'AT&T Inc.', s: 'Communication Services', i: 'Telecom Services' },
  { t: 'TMUS', n: 'T-Mobile US', s: 'Communication Services', i: 'Telecom Services' },
  { t: 'CMCSA', n: 'Comcast Corp.', s: 'Communication Services', i: 'Entertainment' },
  { t: 'CHTR', n: 'Charter Communications', s: 'Communication Services', i: 'Entertainment' },
  { t: 'DIS', n: 'Walt Disney Co.', s: 'Communication Services', i: 'Entertainment' },
  { t: 'NEE', n: 'NextEra Energy', s: 'Utilities', i: 'Utilities - Regulated' },
  { t: 'SO', n: 'Southern Company', s: 'Utilities', i: 'Utilities - Regulated' },
  { t: 'AMT', n: 'American Tower', s: 'Real Estate', i: 'REIT - Specialty' },
  { t: 'PLD', n: 'Prologis', s: 'Real Estate', i: 'REIT - Industrial' }
];

// Helper to generate consistent pseudo-random numbers based on string seed
const seededRandom = (seed: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  const val = (h >>> 0) / 4294967296;
  return val;
};

const generateMockCompany = (data: {t: string, n: string, s: string, i: string}): Company => {
  const seed = data.t;
  const basePrice = 50 + (seededRandom(seed + 'price') * 450); // $50 - $500
  const isUp = seededRandom(seed + 'dir') > 0.45;
  const changePercent = seededRandom(seed + 'chg') * 5 * (isUp ? 1 : -1);
  const change = basePrice * (changePercent / 100);
  
  return {
    ticker: data.t,
    name: data.n,
    description: `${data.n} is a leading player in the ${data.i} industry, known for its innovation and market presence.`,
    sector: data.s,
    industry: data.i,
    logoUrl: `https://ui-avatars.com/api/?name=${data.n}&background=random&color=fff&size=128`, // Fallback logo
    marketCap: 10000000000 + (seededRandom(seed + 'mcap') * 2000000000000),
    price: Number(basePrice.toFixed(2)),
    change: Number(change.toFixed(2)),
    changePercent: Number(changePercent.toFixed(2)),
    dividendYield: seededRandom(seed + 'div') * 0.05
  };
};

const MOCK_COMPANIES: Company[] = STOCK_DATA_SOURCE.map(generateMockCompany);

// Override specifically for key tech giants to have real logos if possible
const logoMap: Record<string, string> = {
  'AAPL': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  'MSFT': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'TSLA': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
  'NVDA': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
  'GOOGL': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'AMZN': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  'META': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
  'NFLX': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
};

MOCK_COMPANIES.forEach(c => {
  if (logoMap[c.ticker]) c.logoUrl = logoMap[c.ticker];
});

const generateMockActions = (): CorporateAction[] => {
  const actions: CorporateAction[] = [];
  const actionTypes = Object.values(ActionType);
  const statuses = ['Upcoming', 'Completed', 'Announced'];
  
  MOCK_COMPANIES.forEach((company, idx) => {
    // Generate 1-3 actions per company
    const numActions = Math.floor(seededRandom(company.ticker + 'act_count') * 3) + 1;
    for (let i = 0; i < numActions; i++) {
      const type = actionTypes[Math.floor(seededRandom(company.ticker + i + 'type') * actionTypes.length)];
      const status = statuses[Math.floor(seededRandom(company.ticker + i + 'status') * statuses.length)] as any;
      const dateOffset = Math.floor(seededRandom(company.ticker + i + 'date') * 60) - 30; // +/- 30 days
      const date = new Date();
      date.setDate(date.getDate() + dateOffset);
      
      let value = 'N/A';
      if (type === ActionType.DIVIDEND) value = `$${(Math.random() * 2).toFixed(2)}/share`;
      if (type === ActionType.STOCK_SPLIT) value = `${Math.floor(Math.random() * 5) + 2}:1`;
      
      actions.push({
        id: `${company.ticker}-${i}`,
        ticker: company.ticker,
        type: type as ActionType,
        date: date.toISOString().split('T')[0],
        description: `${status} ${type} for ${company.name}`,
        status,
        value
      });
    }
  });
  
  // Sort by date descending
  return actions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const MOCK_ACTIONS = generateMockActions();

const generateMockStockHistory = (ticker: string, days: number = 30): StockPricePoint[] => {
  const company = MOCK_COMPANIES.find(c => c.ticker === ticker);
  let currentPrice = company ? company.price : 150;
  
  // Backtrack to start price
  // We want the *last* point to match currentPrice, so we simulate backwards then reverse
  const data: StockPricePoint[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 500000
    });

    // Reverse random walk for previous day
    const volatility = currentPrice * 0.02;
    const change = (Math.random() * volatility * 2) - volatility;
    currentPrice -= change; // Go back in time
  }
  return data.reverse();
};

// --- API HELPERS ---

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchFromAPI = async (endpoint: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;
  try {
    const symbol = endpoint.includes('?') ? '&' : '?';
    const response = await fetch(`${FMP_BASE_URL}/${endpoint}${symbol}apikey=${apiKey}`);
    if (!response.ok) throw new Error('API Request Failed');
    return await response.json();
  } catch (error) {
    console.error("FMP API Error (Falling back to mock):", error);
    return null;
  }
};

// --- DATA SERVICE EXPORT ---

export const DataService = {
  getCompany: async (ticker: string): Promise<Company | null> => {
    // 1. Try Live API
    if (getApiKey()) {
      const data = await fetchFromAPI(`profile/${ticker}`);
      if (data && data.length > 0) {
        const p = data[0];
        return {
          ticker: p.symbol,
          name: p.companyName,
          description: p.description,
          sector: p.sector,
          industry: p.industry,
          logoUrl: p.image,
          marketCap: p.mktCap,
          price: p.price,
          change: p.changes,
          changePercent: Number(((p.changes / p.price) * 100).toFixed(2)), // Approx
          dividendYield: 0 // FMP profile doesn't always have yield, keeping simple
        };
      }
    }

    // 2. Fallback Mock
    await delay(300); 
    const company = MOCK_COMPANIES.find(c => c.ticker === ticker);
    return company || null;
  },

  searchCompanies: async (query: string): Promise<Company[]> => {
    // 1. Try Live API
    if (getApiKey() && query.trim().length > 0) {
      const data = await fetchFromAPI(`search?query=${query}&limit=10`);
      if (data) {
        // Convert search results to minimal Company objects (some fields missing in search)
        return data.map((d: any) => ({
          ticker: d.symbol,
          name: d.name,
          description: '',
          sector: '', // Search endpoint doesn't return sector
          industry: '',
          logoUrl: `https://ui-avatars.com/api/?name=${d.name}&background=random`,
          marketCap: 0,
          price: 0,
          change: 0,
          changePercent: 0,
          dividendYield: 0
        }));
      }
    }

    // 2. Fallback Mock
    await delay(200);
    if (!query) return MOCK_COMPANIES.slice(0, 20); // Return top 20 if empty
    const lowerQuery = query.toLowerCase();
    return MOCK_COMPANIES.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) || 
      c.ticker.toLowerCase().includes(lowerQuery)
    );
  },

  getCorporateActions: async (ticker?: string): Promise<CorporateAction[]> => {
    // Note: FMP 'stock_news' or 'historical-price-full/stock_dividend' could be used here
    // For this demo, strictly using Mock Actions as they are formatted perfectly for our UI.
    await delay(400);
    if (ticker) {
      return MOCK_ACTIONS.filter(a => a.ticker === ticker);
    }
    return MOCK_ACTIONS;
  },

  getStockHistory: async (ticker: string, days: number = 30): Promise<StockPricePoint[]> => {
    // 1. Try Live API
    if (getApiKey()) {
      const data = await fetchFromAPI(`historical-price-full/${ticker}?timeseries=${days}`);
      if (data && data.historical) {
        return data.historical.reverse().map((h: any) => ({
          date: h.date,
          price: h.close,
          volume: h.volume
        }));
      }
    }

    // 2. Fallback Mock
    await delay(300);
    return generateMockStockHistory(ticker, days);
  },
  
  isLive: () => !!getApiKey()
};

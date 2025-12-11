import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { Company, CorporateAction } from '../types';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Company[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [recentActions, setRecentActions] = useState<CorporateAction[]>([]);
  const [marketMovers, setMarketMovers] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isLive = DataService.isLive();

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const actions = await DataService.getCorporateActions();
        setRecentActions(actions.slice(0, 6));

        // Get "All" companies
        const movers = await DataService.searchCompanies('');
        // Sort by absolute change percent to find "Movers"
        const sortedMovers = movers.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 4);
        setMarketMovers(sortedMovers);
        
        setLoading(false);
    };
    fetchData();
  }, []);

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        try {
            const results = await DataService.searchCompanies(searchTerm);
            setSuggestions(results.slice(0, 5));
            setShowSuggestions(true);
        } catch (e) {
            setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const results = await DataService.searchCompanies(searchTerm);
      if (results.length > 0) {
        navigate(`/company/${results[0].ticker}`);
      } else {
        alert(`Company "${searchTerm}" not found in our database.`);
      }
    }
  };

  const getActionColor = (type: string) => {
    switch(type) {
      case 'Dividend': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Stock Split': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Merger': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Acquisition': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Light Professional Hero */}
      <div className="relative bg-gradient-to-b from-emerald-50 via-white to-slate-50 border-b border-slate-200/60 overflow-hidden">
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

        {/* Data Source Indicator */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full border border-slate-200 shadow-sm cursor-help" title={isLive ? "Connected to Financial Modeling Prep API" : "Running in demo mode with simulated data"}>
           <span className="relative flex h-2.5 w-2.5">
              {isLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLive ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wide ${isLive ? 'text-emerald-700' : 'text-slate-500'}`}>
                {isLive ? 'Live Data' : 'Simulated Data'}
            </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-sm">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             AI-Powered Corporate Intelligence
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-6 leading-tight">
            Actionalyze <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Markets</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl font-light leading-relaxed">
             Institutional-grade tracking for dividends, splits, and corporate events with generative AI impact analysis.
          </p>
          
          <div className="w-full max-w-xl relative z-20">
            <form onSubmit={handleSearch} className="relative flex items-center shadow-2xl shadow-emerald-900/5 rounded-2xl group">
              <div className="absolute left-5 text-slate-400 z-10 transition-colors group-focus-within:text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-14 py-4 rounded-2xl text-slate-900 border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 placeholder-slate-400 text-lg font-medium transition-all"
                placeholder="Search ticker (e.g. AAPL, MSFT)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                   if(suggestions.length > 0) setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-2 bottom-2 aspect-square !p-0 rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-none text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Button>
            </form>

            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-top-2 text-left z-50">
                    <div className="py-2">
                        <div className="px-5 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">Companies</div>
                        {suggestions.map((company) => (
                            <div 
                                key={company.ticker}
                                className="flex items-center gap-4 px-5 py-3 hover:bg-emerald-50/50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                                onClick={() => {
                                    navigate(`/company/${company.ticker}`);
                                    setShowSuggestions(false);
                                }}
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
                                    {company.ticker[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-slate-900 text-sm">{company.ticker}</p>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{company.sector}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{company.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Market Movers */}
        <section>
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    Market Movers
                </h2>
            </div>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => <div key={i} className="h-36 bg-slate-100 rounded-xl animate-pulse"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {marketMovers.map(company => (
                        <Card 
                            key={company.ticker} 
                            hover={true} 
                            onClick={() => navigate(`/company/${company.ticker}`)} 
                            className="bg-white border shadow-sm ring-1 ring-slate-100 hover:ring-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300"
                        >
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                     <div className="flex items-center gap-3">
                                         <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {company.logoUrl && !company.logoUrl.includes('ui-avatars') ? (
                                                <img src={company.logoUrl} alt={company.ticker} className="w-6 h-6 object-contain" />
                                            ) : (
                                                <span className="font-bold text-xs text-slate-600">{company.ticker.substring(0,1)}</span>
                                            )}
                                         </div>
                                         <div className="min-w-0">
                                             <h3 className="font-bold text-slate-900 leading-tight">{company.ticker}</h3>
                                             <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide truncate">{company.sector.split(' ')[0]}</p>
                                         </div>
                                     </div>
                                     
                                     <div className={`flex items-center gap-0.5 pl-2 pr-1.5 py-1 rounded-full text-[11px] font-bold tracking-tight shadow-sm border ${company.changePercent >= 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                                        {company.changePercent >= 0 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {Math.abs(company.changePercent)}%
                                     </div>
                                </div>

                                <div className="mt-2">
                                    <span className="text-2xl font-heading font-bold text-slate-900 tracking-tight flex items-baseline">
                                        <span className="text-sm text-slate-400 font-medium mr-0.5 top-0">$</span>
                                        {company.price.toFixed(2)}
                                    </span>
                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                                         <p className="text-xs font-medium text-slate-400 truncate max-w-[120px]" title={company.name}>{company.name}</p>
                                         <span className={`text-[10px] font-mono font-medium ${company.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {company.change > 0 ? '+' : ''}{company.change.toFixed(2)}
                                         </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </section>

        {/* Recent Actions Feed */}
        <section>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Corporate Action Feed</h2>
                    <p className="text-slate-500 text-sm mt-1 hidden sm:block">Real-time updates on dividends, splits, and mergers.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/alerts')}>
                    Configure Alerts
                </Button>
            </div>
            
            {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                <div key={i} className="h-40 bg-slate-100 rounded-xl animate-pulse"></div>
                ))}
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {recentActions.map((action) => (
                <div 
                    key={action.id} 
                    className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 bg-white cursor-pointer relative overflow-hidden"
                    onClick={() => navigate(`/company/${action.ticker}`)}
                >
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-200">
                             <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                         </svg>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-sm text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                {action.ticker.substring(0, 2)}
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-900">{action.ticker}</h4>
                                <span className="text-xs text-slate-400 font-medium">{action.date}</span>
                            </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getActionColor(action.type)}`}>
                            {action.type}
                        </span>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-700 line-clamp-2 min-h-[2.5rem] mb-4 leading-relaxed">
                        {action.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                        <div className="flex items-center gap-1.5">
                             <div className={`w-1.5 h-1.5 rounded-full ${action.status === 'Completed' ? 'bg-slate-300' : 'bg-emerald-500 animate-pulse'}`}></div>
                             <span className="text-xs text-slate-500 font-medium">{action.status}</span>
                        </div>
                        {action.value && (
                            <span className="font-mono text-sm font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{action.value}</span>
                        )}
                    </div>
                </div>
                ))}
            </div>
            )}
        </section>
      </div>
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataService } from '../services/dataService';
import { GeminiService } from '../services/geminiService';
import { Company, CorporateAction, StockPricePoint } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';

const CompanyDetails: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [actions, setActions] = useState<CorporateAction[]>([]);
  const [history, setHistory] = useState<StockPricePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartRange, setChartRange] = useState<number>(30);
  
  // AI States
  const [selectedActionForAI, setSelectedActionForAI] = useState<CorporateAction | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatingImage, setGeneratingImage] = useState(false);

  const isLive = DataService.isLive();

  useEffect(() => {
    if (ticker) {
      fetchInitialData();
    }
  }, [ticker]);

  useEffect(() => {
    if (ticker) {
      updateChartData(chartRange);
    }
  }, [chartRange, ticker]);

  const fetchInitialData = async () => {
    setLoading(true);
    const compData = await DataService.getCompany(ticker || '');
    const actionData = await DataService.getCorporateActions(ticker);
    setCompany(compData);
    setActions(actionData);
    setLoading(false);
  };

  const updateChartData = async (days: number) => {
    const histData = await DataService.getStockHistory(ticker || '', days);
    setHistory(histData);
  };

  const handleAnalyze = async (action: CorporateAction) => {
    if (!company) return;
    setSelectedActionForAI(action);
    setAnalyzing(true);
    setAiAnalysis('');
    
    // Switch tab logic here if needed, usually handled by UI
    const result = await GeminiService.analyzeActionImpact(company, action);
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  const handleGenerateImage = async () => {
    if (!company) return;
    setGeneratingImage(true);
    const imgUrl = await GeminiService.generateStockImage(company);
    setGeneratedImage(imgUrl);
    setGeneratingImage(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Retrieving Market Data...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-slate-500">Company data unavailable.</div>;
  }

  // Enhanced Markdown Renderer for AI Analysis
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
        const trimmed = line.trim();
        // Headers
        if (trimmed.startsWith('###')) return <h4 key={i} className="font-heading font-bold text-slate-800 mt-6 mb-3 text-lg border-b border-slate-100 pb-1">{trimmed.replace(/^###\s*/, '')}</h4>;
        if (trimmed.startsWith('##')) return <h3 key={i} className="font-heading text-xl font-bold text-slate-900 mt-6 mb-3">{trimmed.replace(/^##\s*/, '')}</h3>;
        
        // Bold paragraphs (often used as sub-headers in simple markdown)
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) return <p key={i} className="font-bold text-emerald-700 mt-4 mb-2">{trimmed.replace(/\*\*/g, '')}</p>;
        
        // Numbered Lists
        const numberedListMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numberedListMatch) {
            return (
                <div key={i} className="flex items-start gap-4 my-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mt-0.5 shadow-sm">
                        {numberedListMatch[1]}
                    </span>
                    <p className="text-slate-700 leading-relaxed text-sm font-medium">{numberedListMatch[2].replace(/\*\*/g, '')}</p>
                </div>
            );
        }

        // Bullet Lists
        if (trimmed.startsWith('-') || trimmed.startsWith('* ')) {
            return <li key={i} className="ml-4 text-slate-600 marker:text-emerald-500 mb-1 pl-2 text-sm leading-relaxed">{trimmed.replace(/^[-*]\s*/, '').replace(/\*\*/g, '')}</li>;
        }

        // Empty lines
        if (trimmed === '') return <div key={i} className="h-2"></div>;
        
        // Standard Paragraphs
        return <p key={i} className="text-slate-600 leading-relaxed mb-3 text-sm">{line.replace(/\*\*/g, '')}</p>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      
      {/* Professional Header - Responsive */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
         <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
             <div className="flex items-start md:items-center gap-5">
                 <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center flex-shrink-0">
                     <img src={company.logoUrl} alt={company.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                 </div>
                 <div>
                     <div className="flex flex-wrap items-center gap-2 md:gap-3">
                         <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">{company.ticker}</h1>
                         <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">{company.sector}</span>
                         {/* Data Source Indicator */}
                         <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border bg-slate-50 border-slate-100 cursor-help" title={isLive ? "Using real-time FMP API data" : "Using mock data for demonstration"}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            <span className="text-slate-500">{isLive ? 'Live' : 'Mock'}</span>
                         </div>
                     </div>
                     <p className="text-slate-500 font-medium text-sm md:text-base">{company.name}</p>
                 </div>
             </div>

             <div className="flex items-end flex-row md:flex-col justify-between md:justify-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-slate-100">
                 <div className="flex items-baseline gap-1">
                     <span className="text-3xl md:text-4xl font-mono font-bold text-slate-900 tracking-tight">${company.price.toFixed(2)}</span>
                     <span className="text-slate-400 text-sm font-medium uppercase ml-1">USD</span>
                 </div>
                 <div className={`flex items-center gap-1.5 font-semibold text-sm mt-1 ${company.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {company.change > 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M12 7a1 1 0 1 1 0-2h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V8.414l-4.293 4.293a1 1 0 0 1-1.414 0L8 10.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0L11 10.586 14.586 7H12Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M12 13a1 1 0 1 1 0 2h5a1 1 0 0 1 1-1v-5a1 1 0 1 1-2 0v2.586l-4.293-4.293a1 1 0 0 1-1.414 0L8 9.586 3.707 5.293a1 1 0 0 1-1.414 1.414l5 5a1 1 0 0 1 1.414 0L11 9.414 14.586 13H12Z" clipRule="evenodd" />
                        </svg>
                    )}
                    <span>{company.change > 0 ? '+' : ''}{company.change} ({company.changePercent}%)</span>
                    <span className="text-slate-400 font-normal ml-1">Today</span>
                 </div>
             </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="chart">
            <TabsList>
              <TabsTrigger value="chart">Price History</TabsTrigger>
              <TabsTrigger value="actions">Corporate Actions</TabsTrigger>
              <TabsTrigger value="ai">AI Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="chart">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100/50 pb-4 gap-4">
                  <CardTitle>Market Performance</CardTitle>
                  <div className="flex bg-slate-100 rounded-lg p-0.5 w-full sm:w-auto">
                    {[7, 30, 90, 365].map((d) => (
                        <button 
                            key={d}
                            onClick={() => setChartRange(d)}
                            className={`flex-1 sm:flex-none px-3 py-1 text-xs font-semibold rounded-md transition-all ${chartRange === d ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {d === 7 ? '1W' : d === 30 ? '1M' : d === 90 ? '3M' : '1Y'}
                        </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="h-[300px] sm:h-[400px] pt-6 -ml-4 sm:ml-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        tick={{fontSize: 10, fill: '#94a3b8'}} 
                        axisLine={false}
                        tickLine={false}
                        minTickGap={40}
                        tickFormatter={(str) => {
                            const d = new Date(str);
                            return `${d.getMonth() + 1}/${d.getDate()}`;
                        }}
                        dy={10}
                      />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        tick={{fontSize: 10, fill: '#94a3b8'}} 
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(num) => `$${Math.round(num)}`}
                        width={40}
                      />
                      <Tooltip 
                        contentStyle={{ 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                            padding: '8px 12px' 
                        }}
                        itemStyle={{ color: '#0f172a', fontWeight: 600, fontSize: '13px' }}
                        labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '11px', textTransform: 'uppercase' }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#059669" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                        activeDot={{ r: 4, strokeWidth: 0, fill: '#059669' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions">
              <Card>
                <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle>Events & Actions</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {actions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-3 opacity-40">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0h18M5 10.5h.008v.008H5V10.5Zm0 3h.008v.008H5V13.5Zm0 3h.008v.008H5V16.5Zm3-6h.008v.008H8V10.5Zm0 3h.008v.008H8V13.5Zm0 3h.008v.008H8V16.5Zm3-6h.008v.008H11V10.5Zm0 3h.008v.008H11V13.5Zm0 3h.008v.008H11V16.5Zm3-6h.008v.008H14V10.5Zm0 3h.008v.008H14V13.5Zm0 3h.008v.008H14V16.5Z" />
                        </svg>
                        <p className="font-medium text-sm">No recent corporate actions recorded.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {actions.map(action => (
                        <div key={action.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between group hover:bg-slate-50/50 -mx-6 px-6 transition-colors">
                          <div className="flex-1">
                             <div className="flex items-center gap-3 mb-1">
                                <span className={`h-2 w-2 rounded-full ${action.status === 'Completed' ? 'bg-slate-300' : 'bg-emerald-500'}`}></span>
                                <h4 className="font-bold text-slate-900 text-sm">{action.type}</h4>
                                <span className="text-xs text-slate-400">{action.date}</span>
                             </div>
                             <p className="text-sm text-slate-600">{action.description}</p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                            <span className="font-mono font-semibold text-slate-800 text-sm bg-slate-100 px-2 py-1 rounded">{action.value || 'N/A'}</span>
                            <Button size="sm" variant="outline" onClick={() => handleAnalyze(action)} className="h-8 text-xs border-slate-200">
                              Analyze
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card className="border-emerald-100/50 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100/50 p-4 flex items-center gap-2">
                    <div className="p-1.5 bg-white rounded-md shadow-sm text-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M16.5 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3v-6A4.5 4.5 0 0 1 10.5 6h6Z" />
                            <path d="M18 7.5a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3H18Z" />
                        </svg>
                    </div>
                    <span className="font-bold text-emerald-800 text-sm tracking-tight">Genkit Financial Analyst</span>
                </div>
                
                <CardContent className="p-0">
                  {!selectedActionForAI ? (
                    <div className="text-center py-20 bg-slate-50/30">
                      <p className="font-semibold text-slate-700 mb-2">Ready to Analyze</p>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">Select a corporate action from the Actions tab to generate a comprehensive impact report.</p>
                      <Button variant="outline" size="sm" onClick={() => (document.querySelector('[data-state="inactive"][value="actions"]') as HTMLElement)?.click()}>
                        Select Action
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col min-h-[400px]">
                      <div className="p-6 border-b border-slate-100 bg-white">
                         <div className="flex items-center gap-3 mb-2">
                             <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Event</span>
                             <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{selectedActionForAI.type}</span>
                         </div>
                         <h3 className="text-lg font-bold text-slate-900 leading-tight">{selectedActionForAI.description}</h3>
                      </div>
                      
                      <div className="flex-1 p-6 bg-white">
                          {analyzing ? (
                            <div className="space-y-4 max-w-2xl">
                                <div className="flex items-center gap-3 text-emerald-600 text-sm font-medium animate-pulse">
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Analyzing market impact...
                                </div>
                                <div className="h-2 bg-slate-100 rounded w-full"></div>
                                <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                                <div className="h-2 bg-slate-100 rounded w-4/6"></div>
                            </div>
                          ) : (
                            <div className="prose prose-sm prose-slate max-w-none">
                                {renderMarkdown(aiAnalysis)}
                            </div>
                          )}
                      </div>
                      
                      <div className="bg-slate-50 p-4 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
                        Disclaimer: This analysis is generated by AI for informational purposes only. It does not constitute financial advice. Market conditions change rapidly; always verify with official sources.
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Stacks on Mobile */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-base">Key Data Points</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Market Cap</p>
                      <p className="font-semibold text-slate-900 text-sm">${(company.marketCap / 1e9).toFixed(2)}B</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Div Yield</p>
                      <p className="font-semibold text-slate-900 text-sm">{(company.dividendYield * 100).toFixed(2)}%</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 col-span-2">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Industry</p>
                      <p className="font-semibold text-slate-900 text-sm truncate">{company.industry}</p>
                  </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-emerald-100 shadow-glow">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
             <CardHeader className="relative z-10 pb-2">
               <CardTitle className="text-base flex items-center gap-2">
                 Shareable Insight
                 <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">New</span>
               </CardTitle>
             </CardHeader>
             <CardContent className="relative z-10 pt-4">
                <p className="text-xs text-slate-500 mb-4">Generate a professional visual summary of {company.ticker}'s current market standing.</p>
                <div className="mb-4 bg-slate-100 rounded-lg aspect-[4/3] flex items-center justify-center overflow-hidden border border-slate-200 shadow-inner group relative">
                  {generatingImage ? (
                    <div className="flex flex-col items-center gap-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                    </div>
                  ) : generatedImage ? (
                    <div className="relative w-full h-full">
                        <img src={generatedImage} alt="AI Generated Stock Insight" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <Button size="sm" variant="secondary" onClick={() => window.open(generatedImage, '_blank')}>
                                View Full Size
                            </Button>
                        </div>
                    </div>
                  ) : (
                    <div className="text-center cursor-pointer transition-transform hover:scale-105 duration-300" onClick={handleGenerateImage}>
                        <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-2 text-emerald-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Preview</span>
                    </div>
                  )}
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleGenerateImage} loading={generatingImage} disabled={generatingImage || !!generatedImage}>
                  {generatedImage ? 'Regenerate Graphic' : 'Generate Graphic'}
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
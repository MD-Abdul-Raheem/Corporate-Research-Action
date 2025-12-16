import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            About Actionalyze
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
            Corporate Actions Intelligence Platform
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Track dividends, stock splits, mergers, and other corporate events with AI-powered impact analysis.
          </p>
        </div>

        {/* What is Actionalyze */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
              </div>
              What is Actionalyze?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 leading-relaxed mb-4">
              Actionalyze is an institutional-grade corporate actions tracking platform designed for investors, traders, and financial analysts. 
              The platform aggregates real-time data on corporate events such as dividends, stock splits, mergers, acquisitions, rights issues, 
              bonus issues, and spin-offs.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Built with modern web technologies and powered by Google's Gemini AI, Actionalyze provides intelligent analysis of how corporate 
              actions may impact stock prices, investor sentiment, and portfolio strategies.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                </svg>
              </div>
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Real-Time Market Data</h4>
                  <p className="text-sm text-slate-600">Live stock prices, market cap, and performance metrics from Financial Modeling Prep API.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Corporate Action Feed</h4>
                  <p className="text-sm text-slate-600">Comprehensive tracking of dividends, splits, mergers, acquisitions, and more.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">AI-Powered Analysis</h4>
                  <p className="text-sm text-slate-600">Gemini AI generates impact reports analyzing sentiment, price effects, and strategic implications.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Custom Alerts</h4>
                  <p className="text-sm text-slate-600">Configure price targets and event notifications to stay ahead of market movements.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">5</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Interactive Charts</h4>
                  <p className="text-sm text-slate-600">Visualize historical price data with customizable timeframes (1W, 1M, 3M, 1Y).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">6</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Company Profiles</h4>
                  <p className="text-sm text-slate-600">Detailed company information including sector, industry, and key financial metrics.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M16.5 7.5h-9v9h9v-9Z" />
                  <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
              </div>
              Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-500">⚛️</span> Frontend
                </h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• React 19 with TypeScript</li>
                  <li>• React Router for navigation</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Recharts for data visualization</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-green-500">🤖</span> AI & APIs
                </h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Google Gemini 2.5 Flash</li>
                  <li>• Financial Modeling Prep API</li>
                  <li>• Real-time market data integration</li>
                  <li>• AI image generation</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-orange-500">⚡</span> Build Tools
                </h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Vite for fast development</li>
                  <li>• TypeScript for type safety</li>
                  <li>• ESM module system</li>
                  <li>• Hot module replacement</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-purple-500">🎨</span> Design
                </h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Responsive mobile-first design</li>
                  <li>• Custom UI component library</li>
                  <li>• Professional color palette</li>
                  <li>• Smooth animations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                </svg>
              </div>
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">1</div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold text-slate-900 mb-1">Search for Companies</h4>
                  <p className="text-sm text-slate-600">Use the search bar to find any publicly traded company by ticker symbol or name. The platform supports 100+ major US stocks.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">2</div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold text-slate-900 mb-1">View Corporate Actions</h4>
                  <p className="text-sm text-slate-600">Browse recent and upcoming corporate events including dividends, stock splits, mergers, acquisitions, rights issues, and more.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">3</div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold text-slate-900 mb-1">Analyze with AI</h4>
                  <p className="text-sm text-slate-600">Click "Analyze" on any corporate action to generate an AI-powered impact report covering price effects, sentiment, and strategic implications.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">4</div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold text-slate-900 mb-1">Set Up Alerts</h4>
                  <p className="text-sm text-slate-600">Configure custom alerts for price targets or specific corporate events to receive notifications when conditions are met.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                </svg>
              </div>
              Who Uses Actionalyze?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-slate-900 mb-2">Retail Investors</h4>
                <p className="text-sm text-slate-600">Track dividend payments, stock splits, and other events affecting portfolio holdings.</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="text-3xl mb-2">💼</div>
                <h4 className="font-semibold text-slate-900 mb-2">Financial Analysts</h4>
                <p className="text-sm text-slate-600">Research corporate actions and generate AI-powered impact assessments for clients.</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-slate-900 mb-2">Day Traders</h4>
                <p className="text-sm text-slate-600">Monitor real-time market movers and set alerts for price targets and events.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="mb-8 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-emerald-600 text-white rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                  <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                </svg>
              </div>
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-slate-700 font-medium">To run Actionalyze locally:</p>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="mb-2"># Install dependencies</div>
                <div className="text-emerald-400">npm install</div>
                <div className="mt-3 mb-2"># Set your Gemini API key in .env.local</div>
                <div className="text-blue-400">GEMINI_API_KEY=your_api_key_here</div>
                <div className="mt-3 mb-2"># Run the development server</div>
                <div className="text-emerald-400">npm run dev</div>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                The app will run on <code className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">http://localhost:5173</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="text-center py-8">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;

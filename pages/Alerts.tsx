import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert, ActionType } from '../types';

const MOCK_ALERTS: Alert[] = [
  { id: '1', ticker: 'AAPL', condition: 'Price below $170', targetPrice: 170, active: true },
  { id: '2', ticker: 'TSLA', condition: 'Dividend Announced', actionType: ActionType.DIVIDEND, active: true },
  { id: '3', ticker: 'NVDA', condition: 'Stock Split Announced', actionType: ActionType.STOCK_SPLIT, active: false },
  { id: '4', ticker: 'MSFT', condition: 'Price above $450', targetPrice: 450, active: true },
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    ticker: '',
    type: 'price' as 'price' | 'action',
    priceCondition: 'above' as 'above' | 'below',
    priceTarget: '',
    actionType: ActionType.DIVIDEND,
    active: true
  });

  const activeCount = alerts.filter(a => a.active).length;

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ticker) return;

    const newAlert: Alert = {
        id: Math.random().toString(36).substr(2, 9),
        ticker: formData.ticker.toUpperCase(),
        active: formData.active,
        condition: '',
    };

    if (formData.type === 'price') {
        const price = parseFloat(formData.priceTarget);
        if (isNaN(price)) return;
        newAlert.targetPrice = price;
        newAlert.condition = `Price ${formData.priceCondition} $${price}`;
    } else {
        newAlert.actionType = formData.actionType;
        newAlert.condition = `${formData.actionType} Announced`;
    }

    setAlerts([newAlert, ...alerts]);
    setIsModalOpen(false);
    // Reset form
    setFormData({
        ...formData,
        ticker: '',
        priceTarget: ''
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-heading font-bold text-slate-900">Alert Manager</h1>
           <p className="text-slate-500 mt-1 text-sm">Configure notifications for market events.</p>
        </div>
        <Button 
            className="shadow-md bg-emerald-600 hover:bg-emerald-700" 
            onClick={() => setIsModalOpen(true)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Alert
        </Button>
      </div>

      {/* Summary Cards - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Alerts</p>
                  <p className="text-2xl font-bold text-slate-900">{alerts.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                  </svg>
              </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Active</p>
                  <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
              </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Paused</p>
                  <p className="text-2xl font-bold text-slate-500">{alerts.length - activeCount}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                  </svg>
              </div>
          </div>
      </div>

      <div className="grid gap-4">
        {alerts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </div>
            <p className="text-slate-900 font-semibold">No alerts configured</p>
            <p className="text-slate-500 text-sm mt-1 mb-4">Set up triggers to stay informed on price moves.</p>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Create Alert</Button>
          </div>
        ) : (
          alerts.map((alert) => (
            <Card key={alert.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 transition-all ${alert.active ? 'bg-white' : 'bg-slate-50 opacity-75'}`}>
              <div className="flex items-center gap-5 w-full sm:w-auto mb-4 sm:mb-0">
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-sm font-bold text-lg border flex-shrink-0
                    ${alert.active 
                        ? 'bg-white text-slate-800 border-slate-200' 
                        : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                >
                   {alert.ticker[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                     <h3 className="font-bold text-lg text-slate-900">{alert.ticker}</h3>
                     {!alert.active && <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">Paused</span>}
                  </div>
                  <p className="text-sm text-slate-600 font-medium flex items-center gap-1.5">
                    {alert.targetPrice ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-slate-400">
                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-slate-400">
                             <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                        </svg>
                    )}
                    {alert.condition}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${alert.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {alert.active ? 'Active' : 'Inactive'}
                    </span>
                    <button 
                        onClick={() => toggleAlert(alert.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${alert.active ? 'bg-emerald-600' : 'bg-slate-300'}`}
                    >
                        <span className="sr-only">Toggle alert</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${alert.active ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
                
                <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                  onClick={() => deleteAlert(alert.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* CREATE ALERT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 font-heading">Configure Alert</h2>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleCreateAlert} className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Asset</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 uppercase font-mono placeholder:normal-case font-bold text-slate-800"
                            placeholder="e.g. AAPL"
                            value={formData.ticker}
                            onChange={(e) => setFormData({...formData, ticker: e.target.value})}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, type: 'price'})}
                            className={`py-2 text-sm font-semibold rounded-md transition-all ${formData.type === 'price' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            Price Target
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, type: 'action'})}
                            className={`py-2 text-sm font-semibold rounded-md transition-all ${formData.type === 'action' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            Corporate Event
                        </button>
                    </div>

                    {formData.type === 'price' ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-1">
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Condition</label>
                                    <select 
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                                        value={formData.priceCondition}
                                        onChange={(e) => setFormData({...formData, priceCondition: e.target.value as 'above' | 'below'})}
                                    >
                                        <option value="above">Above</option>
                                        <option value="below">Below</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Price ($)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        placeholder="150.00"
                                        value={formData.priceTarget}
                                        onChange={(e) => setFormData({...formData, priceTarget: e.target.value})}
                                        required={formData.type === 'price'}
                                    />
                                </div>
                             </div>
                        </div>
                    ) : (
                        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
                            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Event Type</label>
                            <select 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                                value={formData.actionType}
                                onChange={(e) => setFormData({...formData, actionType: e.target.value as ActionType})}
                            >
                                {Object.values(ActionType).map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                        <input 
                            type="checkbox" 
                            id="active"
                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                            checked={formData.active}
                            onChange={(e) => setFormData({...formData, active: e.target.checked})}
                        />
                        <label htmlFor="active" className="text-sm text-slate-600 font-medium">Activate alert immediately</label>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-2">
                        <Button type="button" variant="ghost" className="w-full text-slate-500" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Save Alert</Button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
import React, { useState } from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

// Context for Tabs
const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return (
    <div className="inline-flex h-11 items-center justify-start rounded-lg bg-slate-100 p-1 text-slate-500 w-full mb-6 overflow-x-auto no-scrollbar">
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");
  
  const isActive = context.activeTab === value;
  
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 md:px-6 py-2 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ring-offset-background flex-1 md:flex-none
      ${isActive ? 'bg-white text-emerald-700 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
      onClick={() => context.setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");
  
  if (context.activeTab !== value) return null;
  
  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none animate-in fade-in-50">
      {children}
    </div>
  );
};
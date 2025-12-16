import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CompanyDetails from './pages/CompanyDetails';
import Alerts from './pages/Alerts';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-slate-900 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company/:ticker" element={<CompanyDetails />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-border py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Actionalyze. All rights reserved.</p>
            <p className="mt-2">Simulated Data for Demo Purposes.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
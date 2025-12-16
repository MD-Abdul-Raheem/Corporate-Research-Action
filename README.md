# Actionalyze - Corporate Actions Tracker

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
</div>

## 📊 Overview

Actionalyze is an institutional-grade corporate actions tracking platform designed for investors, traders, and financial analysts. Track dividends, stock splits, mergers, acquisitions, and other corporate events with AI-powered impact analysis.

### ✨ Key Features

- **Real-Time Market Data** - Live stock prices and performance metrics from Financial Modeling Prep API
- **Corporate Action Feed** - Comprehensive tracking of dividends, splits, mergers, acquisitions, and more
- **AI-Powered Analysis** - Gemini AI generates impact reports analyzing sentiment and price effects
- **Custom Alerts** - Configure price targets and event notifications
- **Interactive Charts** - Visualize historical price data with customizable timeframes
- **Company Profiles** - Detailed information including sector, industry, and key metrics
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Gemini API Key (get one at [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd actionalyze---corporate-actions-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   Open `.env.local` and set your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🏗️ Technology Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization library

### AI & APIs
- **Google Gemini 2.5 Flash** - AI-powered analysis and image generation
- **Financial Modeling Prep API** - Real-time market data (optional)

### Build Tools
- **Vite** - Fast development and optimized builds
- **ESM** - Modern module system

## 📱 Features in Detail

### 1. Dashboard
- Search companies by ticker or name
- View market movers with real-time price changes
- Browse recent corporate actions feed
- Live/Mock data indicator

### 2. Company Details
- Real-time stock price and performance metrics
- Interactive price history charts (1W, 1M, 3M, 1Y)
- Corporate actions timeline
- AI-powered impact analysis
- Generate shareable stock insights

### 3. Alert Manager
- Create price-based alerts (above/below targets)
- Set corporate event notifications
- Toggle alerts on/off
- Track active and paused alerts

### 4. About Page
- Comprehensive app documentation
- Feature explanations
- Technology stack details
- Use cases and getting started guide

## 🎨 Design Philosophy

- **Professional & Clean** - Emerald green color scheme with modern aesthetics
- **Mobile-First** - Responsive design that works on all devices
- **Accessibility** - WCAG compliant with proper contrast and focus states
- **Performance** - Optimized loading and smooth animations

## 📂 Project Structure

```
actionalyze---corporate-actions-tracker/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Tabs.tsx
│   └── Navbar.tsx       # Navigation component
├── pages/
│   ├── Home.tsx         # Dashboard page
│   ├── CompanyDetails.tsx
│   ├── Alerts.tsx       # Alert manager
│   └── About.tsx        # About page
├── services/
│   ├── dataService.ts   # Market data API
│   └── geminiService.ts # AI integration
├── App.tsx              # Main app component
├── types.ts             # TypeScript definitions
└── index.tsx            # Entry point
```

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Data Sources

### Live Mode (with API key)
- Financial Modeling Prep API for real-time market data
- Requires free or paid API key

### Demo Mode (without API key)
- Simulated data for 100+ major US stocks
- Realistic price movements and corporate actions
- Perfect for testing and demonstrations

## 🤖 AI Features

### Impact Analysis
- Analyzes corporate actions using Gemini 2.5 Flash
- Provides sentiment analysis (Bullish/Bearish/Neutral)
- Explains price impact and strategic implications
- Tailored analysis for different action types

### Image Generation
- Creates professional stock insight graphics
- Shareable visual summaries
- Futuristic fintech aesthetic

## 🔐 Security Notes

- API keys are stored in `.env.local` (not committed to git)
- Never expose API keys in client-side code in production
- Consider using a backend proxy for API calls in production

## 📄 License

This project is for demonstration purposes. All rights reserved.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent analysis
- Financial Modeling Prep for market data
- React and Vite communities
- Tailwind CSS for styling utilities

## 📞 Support

For questions or issues, please open an issue in the repository.

---

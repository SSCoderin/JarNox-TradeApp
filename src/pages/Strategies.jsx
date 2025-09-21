import React, { useState } from 'react';
import { Play, Pause, Settings, TrendingUp, TrendingDown, BarChart3, Target, Zap, AlertTriangle } from 'lucide-react';

const Strategies = () => {
  const [strategies, setStrategies] = useState([
    {
      id: 1,
      name: "Moving Average Crossover",
      description: "Buy when 50-day MA crosses above 200-day MA",
      status: "active",
      performance: 15.4,
      trades: 24,
      winRate: 67,
      allocation: 25,
      risk: "Medium",
      assets: ["AAPL", "MSFT", "GOOGL"],
      lastSignal: "2 hours ago"
    },
    {
      id: 2,
      name: "RSI Mean Reversion",
      description: "Trade oversold/overbought conditions using RSI",
      status: "active",
      performance: -3.2,
      trades: 18,
      winRate: 55,
      allocation: 20,
      risk: "Low",
      assets: ["TSLA", "NVDA", "AMD"],
      lastSignal: "1 day ago"
    },
    {
      id: 3,
      name: "Momentum Breakout",
      description: "Trade breakouts with volume confirmation",
      status: "paused",
      performance: 22.8,
      trades: 31,
      winRate: 74,
      allocation: 30,
      risk: "High",
      assets: ["QQQ", "SPY", "IWM"],
      lastSignal: "3 days ago"
    },
    {
      id: 4,
      name: "Pairs Trading",
      description: "Market neutral strategy using correlated pairs",
      status: "inactive",
      performance: 8.7,
      trades: 45,
      winRate: 62,
      allocation: 15,
      risk: "Low",
      assets: ["KO/PEP", "JPM/BAC"],
      lastSignal: "1 week ago"
    },
    {
      id: 5,
      name: "Bollinger Band Squeeze",
      description: "Trade volatility expansion after compression",
      status: "active",
      performance: 11.3,
      trades: 12,
      winRate: 83,
      allocation: 10,
      risk: "Medium",
      assets: ["BTC-USD", "ETH-USD"],
      lastSignal: "5 minutes ago"
    }
  ]);

  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleStrategyStatus = (id) => {
    setStrategies(strategies.map(strategy => 
      strategy.id === id 
        ? { ...strategy, status: strategy.status === 'active' ? 'paused' : 'active' }
        : strategy
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900';
      case 'paused': return 'text-yellow-400 bg-yellow-900';
      case 'inactive': return 'text-gray-400 bg-gray-800';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const strategyTemplates = [
    {
      name: "SMA Crossover",
      description: "Simple moving average crossover strategy",
      risk: "Low",
      timeframe: "Daily"
    },
    {
      name: "MACD Signal",
      description: "MACD histogram and signal line strategy",
      risk: "Medium",
      timeframe: "4H"
    },
    {
      name: "Stochastic Oscillator",
      description: "Overbought/oversold momentum strategy",
      risk: "Medium",
      timeframe: "1H"
    },
    {
      name: "Volume Profile",
      description: "Price action with volume analysis",
      risk: "High",
      timeframe: "15M"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Trading Strategies</h1>
            <p className="text-gray-400 mt-1">Manage and monitor your automated trading strategies</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Create Strategy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Strategies</p>
                <p className="text-2xl font-bold text-white">
                  {strategies.filter(s => s.status === 'active').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Return</p>
                <p className="text-2xl font-bold text-green-400">+54.0%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Trades</p>
                <p className="text-2xl font-bold text-white">130</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg Win Rate</p>
                <p className="text-2xl font-bold text-white">68%</p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Strategies List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Your Strategies</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="p-6 hover:bg-gray-750 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-white">{strategy.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(strategy.status)}`}>
                        {strategy.status}
                      </span>
                      <span className={`text-sm font-medium ${getRiskColor(strategy.risk)}`}>
                        {strategy.risk} Risk
                      </span>
                    </div>
                    <p className="text-gray-400 mt-1">{strategy.description}</p>
                    <div className="flex items-center space-x-6 mt-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Performance:</span>
                        <span className={`font-medium ${strategy.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {strategy.performance >= 0 ? '+' : ''}{strategy.performance}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Trades:</span>
                        <span className="text-white font-medium">{strategy.trades}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Win Rate:</span>
                        <span className="text-white font-medium">{strategy.winRate}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Allocation:</span>
                        <span className="text-white font-medium">{strategy.allocation}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Assets:</span>
                        <div className="flex space-x-1">
                          {strategy.assets.map((asset, index) => (
                            <span key={index} className="bg-gray-700 px-2 py-1 rounded text-xs">
                              {asset}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Last Signal:</span>
                        <span className="text-white">{strategy.lastSignal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-6">
                    <button
                      onClick={() => toggleStrategyStatus(strategy.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        strategy.status === 'active'
                          ? 'bg-red-900 text-red-400 hover:bg-red-800'
                          : 'bg-green-900 text-green-400 hover:bg-green-800'
                      }`}
                    >
                      {strategy.status === 'active' ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Templates */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Strategy Templates</h2>
            <p className="text-gray-400 mt-1">Quick start with pre-built strategies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {strategyTemplates.map((template, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer">
                <h3 className="font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2 py-1 rounded ${getRiskColor(template.risk)} bg-opacity-20`}>
                    {template.risk}
                  </span>
                  <span className="text-gray-400">{template.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Management Alert */}
        <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-400">Risk Management Notice</h3>
              <p className="text-gray-300 mt-1">
                Your total strategy allocation is currently at 100%. Consider diversifying across different time frames 
                and asset classes to reduce correlation risk. Monitor drawdown limits and adjust position sizes accordingly.
              </p>
              <button className="mt-3 bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                Review Risk Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Strategy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Strategy</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Strategy Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter strategy name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Strategy Type</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                  <option>Moving Average Crossover</option>
                  <option>RSI Mean Reversion</option>
                  <option>Momentum Breakout</option>
                  <option>Bollinger Bands</option>
                  <option>Custom Strategy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Risk Level</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Initial Allocation (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="10"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Create Strategy
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Strategies;
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
  Minus
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Portfolio = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [viewType, setViewType] = useState('holdings'); 

  const portfolioSummary = {
    totalValue: 125847.50,
    dayChange: 2847.82,
    dayChangePercent: 2.31,
    totalGainLoss: 25847.50,
    totalGainLossPercent: 25.85,
    buyingPower: 15240.75,
    marginUsed: 5890.25
  };

  const [holdings, setHoldings] = useState([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 150,
      avgPrice: 165.32,
      currentPrice: 178.45,
      marketValue: 26767.50,
      gainLoss: 1969.50,
      gainLossPercent: 7.95,
      allocation: 21.3,
      sector: 'Technology'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      quantity: 75,
      avgPrice: 338.21,
      currentPrice: 342.89,
      marketValue: 25716.75,
      gainLoss: 351.00,
      gainLossPercent: 1.38,
      allocation: 20.4,
      sector: 'Technology'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 100,
      avgPrice: 125.67,
      currentPrice: 132.45,
      marketValue: 13245.00,
      gainLoss: 678.00,
      gainLossPercent: 5.39,
      allocation: 10.5,
      sector: 'Communication'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      quantity: 80,
      avgPrice: 198.45,
      currentPrice: 195.32,
      marketValue: 15625.60,
      gainLoss: -250.40,
      gainLossPercent: -1.58,
      allocation: 12.4,
      sector: 'Consumer Discretionary'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      quantity: 50,
      avgPrice: 445.23,
      currentPrice: 478.90,
      marketValue: 23945.00,
      gainLoss: 1683.50,
      gainLossPercent: 7.56,
      allocation: 19.0,
      sector: 'Technology'
    },
    {
      symbol: 'SPY',
      name: 'SPDR S&P 500 ETF',
      quantity: 40,
      avgPrice: 425.67,
      currentPrice: 431.25,
      marketValue: 17250.00,
      gainLoss: 223.20,
      gainLossPercent: 1.31,
      allocation: 13.7,
      sector: 'ETF'
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  // Portfolio performance chart data
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [100000, 105000, 98000, 112000, 118000, 125847.50],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'S&P 500',
        data: [100000, 103000, 101000, 108000, 115000, 120000],
        borderColor: '#6366f1',
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false,
      }
    ],
  };

  // Sector allocation data
  const sectorData = {
    labels: ['Technology', 'Communication', 'Consumer Discretionary', 'ETF'],
    datasets: [
      {
        data: [60.7, 10.5, 12.4, 13.7],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
        borderColor: '#1f2937',
        borderWidth: 2,
      }
    ],
  };

  // Asset allocation data
  const assetData = {
    labels: ['Stocks', 'ETFs', 'Cash', 'Options'],
    datasets: [
      {
        data: [78.5, 13.7, 5.8, 2.0],
        backgroundColor: ['#ef4444', '#10b981', '#3b82f6', '#f59e0b'],
        borderColor: '#1f2937',
        borderWidth: 2,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'white' }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
      }
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { color: '#374151' }
      },
      y: {
        ticks: { 
          color: '#9CA3AF',
          callback: function(value) {
            return formatCurrency(value);
          }
        },
        grid: { color: '#374151' }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { 
          color: 'white',
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  };

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Portfolio</h1>
            <p className="text-gray-400 mt-1">Track your investments and performance</p>
          </div>
          <div className="flex space-x-2">
            {['holdings', 'performance', 'allocation'].map((type) => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  viewType === type 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Value</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(portfolioSummary.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm font-medium">
                {formatPercent(portfolioSummary.dayChangePercent)}
              </span>
              <span className="text-gray-400 text-sm ml-2">today</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Day P&L</p>
                <p className={`text-2xl font-bold ${portfolioSummary.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(portfolioSummary.dayChange)}
                </p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-400 text-sm font-medium">
                +{formatPercent(portfolioSummary.dayChangePercent)}
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${portfolioSummary.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(portfolioSummary.totalGainLoss)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-400 text-sm font-medium">
                {formatPercent(portfolioSummary.totalGainLossPercent)}
              </span>
              <span className="text-gray-400 text-sm ml-2">all time</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Buying Power</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(portfolioSummary.buyingPower)}</p>
              </div>
              <PieChart className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-gray-400 text-sm">Available for trading</span>
            </div>
          </div>
        </div>

        {/* Time Frame Selector */}
        <div className="flex justify-center">
          <div className="bg-gray-800 rounded-lg p-1 border border-gray-700">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Based on View Type */}
        {viewType === 'holdings' && (
          <div className="space-y-6">
            {/* Holdings Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Current Holdings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-750">
                    <tr>
                      <th className="text-left py-3 px-6 text-gray-400 font-medium">Symbol</th>
                      <th className="text-right py-3 px-6 text-gray-400 font-medium">Shares</th>
                      <th className="text-right py-3 px-6 text-gray-400 font-medium">Avg Cost</th>
                      <th className="text-right py-3 px-6 text-gray-400 font-medium">Current Price</th>
                      <th className="text-right py-3 px-6 text-gray-400 font-medium">Market Value</th>
                      <th className="text-right py-3 px-6 text-gray-400 font-medium">Gain/Loss</th>
                      <th className="text-right py-3 px-6 text-gray-400 font-medium">%</th>
                      <th className="text-center py-3 px-6 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {holdings.map((holding) => (
                      <tr key={holding.symbol} className="hover:bg-gray-750 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-semibold text-white">{holding.symbol}</div>
                            <div className="text-sm text-gray-400">{holding.name}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right text-white">{holding.quantity.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right text-white">{formatCurrency(holding.avgPrice)}</td>
                        <td className="py-4 px-6 text-right text-white">{formatCurrency(holding.currentPrice)}</td>
                        <td className="py-4 px-6 text-right text-white font-semibold">{formatCurrency(holding.marketValue)}</td>
                        <td className={`py-4 px-6 text-right font-semibold ${holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(holding.gainLoss)}
                        </td>
                        <td className={`py-4 px-6 text-right font-semibold ${holding.gainLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatPercent(holding.gainLossPercent)}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="p-1 text-blue-400 hover:text-blue-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-green-400 hover:text-green-300">
                              <Plus className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-red-400 hover:text-red-300">
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {viewType === 'performance' && (
          <div className="space-y-6">
            {/* Performance Chart */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Portfolio Performance</h3>
              <div className="h-96">
                <Line data={performanceData} options={chartOptions} />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Returns</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">1 Day</span>
                    <span className="text-green-400">+2.31%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">1 Week</span>
                    <span className="text-green-400">+4.87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">1 Month</span>
                    <span className="text-green-400">+8.92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">YTD</span>
                    <span className="text-green-400">+25.85%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Risk Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Beta</span>
                    <span className="text-white">1.15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sharpe Ratio</span>
                    <span className="text-white">1.82</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Drawdown</span>
                    <span className="text-red-400">-8.45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volatility</span>
                    <span className="text-white">18.3%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Benchmarks</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">vs S&P 500</span>
                    <span className="text-green-400">+5.85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">vs NASDAQ</span>
                    <span className="text-green-400">+3.42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">vs Dow Jones</span>
                    <span className="text-green-400">+7.23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Alpha</span>
                    <span className="text-green-400">+4.67%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewType === 'allocation' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sector Allocation */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Sector Allocation</h3>
                <div className="h-80">
                  <Doughnut data={sectorData} options={pieOptions} />
                </div>
              </div>

              {/* Asset Allocation */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Asset Allocation</h3>
                <div className="h-80">
                  <Doughnut data={assetData} options={pieOptions} />
                </div>
              </div>
            </div>

            {/* Allocation Details */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Allocation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-300">By Sector</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Technology</span>
                      <span className="text-white">60.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ETF</span>
                      <span className="text-white">13.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Consumer Discretionary</span>
                      <span className="text-white">12.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Communication</span>
                      <span className="text-white">10.5%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-300">By Asset Type</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Individual Stocks</span>
                      <span className="text-white">78.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ETFs</span>
                      <span className="text-white">13.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cash</span>
                      <span className="text-white">5.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Options</span>
                      <span className="text-white">2.0%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-300">Geographic</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">US Domestic</span>
                      <span className="text-white">92.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">International</span>
                      <span className="text-white">5.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Emerging Markets</span>
                      <span className="text-white">2.0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
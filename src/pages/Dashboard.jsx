
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart3,
  Zap,
} from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [marketData, setMarketData] = useState({
    totalValue: 25847.5,
    dayChange: 1247.82,
    dayChangePercent: 5.07,
    positions: 12,
    winRate: 68.5,
  });

  const [recentTrades, setRecentTrades] = useState([
    {
      id: 1,
      symbol: "AAPL",
      type: "BUY",
      quantity: 50,
      price: 178.23,
      time: "10:45 AM",
      pnl: 156.5,
    },
    {
      id: 2,
      symbol: "MSFT",
      type: "SELL",
      quantity: 25,
      price: 342.67,
      time: "11:20 AM",
      pnl: -87.25,
    },
    {
      id: 3,
      symbol: "GOOGL",
      type: "BUY",
      quantity: 15,
      price: 125.89,
      time: "12:15 PM",
      pnl: 234.75,
    },
    {
      id: 4,
      symbol: "TSLA",
      type: "SELL",
      quantity: 30,
      price: 195.44,
      time: "01:30 PM",
      pnl: 445.8,
    },
    {
      id: 5,
      symbol: "NVDA",
      type: "BUY",
      quantity: 20,
      price: 456.12,
      time: "02:45 PM",
      pnl: -123.45,
    },
  ]);

  const [topPerformers, setTopPerformers] = useState([
    { symbol: "TSLA", change: 8.45, value: 195.44 },
    { symbol: "NVDA", change: 6.23, value: 456.12 },
    { symbol: "AAPL", change: 3.17, value: 178.23 },
    { symbol: "AMD", change: -2.45, value: 98.76 },
    { symbol: "MSFT", change: -1.23, value: 342.67 },
  ]);

  // const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent > 0 ? "+" : ""}${percent.toFixed(2)}%`;
  };

  // Portfolio performance chart data
  const portfolioChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Portfolio Value",
        data: [20000, 21500, 22800, 21200, 24500, 25847.5],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Benchmark (S&P 500)",
        data: [20000, 20800, 21600, 20900, 22400, 23200],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Trading volume chart data
  const volumeChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Trades",
        data: [12, 19, 15, 25, 22],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "#3b82f6",
        borderWidth: 1,
      },
    ],
  };

  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       labels: { color: 'white' }
  //     },
  //     tooltip: {
  //       backgroundColor: 'rgba(0, 0, 0, 0.8)',
  //       titleColor: 'white',
  //       bodyColor: 'white',
  //     }
  //   },
  //   scales: {
  //     x: {
  //       ticks: { color: '#9CA3AF' },
  //       grid: { color: '#374151' }
  //     },
  //     y: {
  //       ticks: { color: '#9CA3AF' },
  //       grid: { color: '#374151' }
  //     }
  //   }
  // };

  const [livePrice, setLivePrice] = useState(null);
  const [currentTicker, setCurrentTicker] = useState("AAPL");
  const [pnl, setPnl] = useState(0);
  const [trades, setTrades] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(10000);
  const [liveChartData, setLiveChartData] = useState([]);
  const [backtestResults, setBacktestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!currentTicker) return;
      setLoading(true);
      setBackendError(false);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/historical/${currentTicker}?period=1mo&interval=1d`
        );
        console.log("Historical data fetched:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setBackendError(true);
        setLoading(false);
      }
    };
    fetchHistoricalData();
  }, [currentTicker]);

  // WebSocket for live data feed
  useEffect(() => {
    if (!currentTicker) return;

    let ws = null;
    const connectWebSocket = () => {
      try {
        ws = new WebSocket(`ws://127.0.0.1:8000/ws/live-feed/${currentTicker}`);

        ws.onopen = () => {
          console.log("WebSocket connected");
          setBackendError(false);
          setWsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.error) {
              console.error("WebSocket Error:", data.error);
              setBackendError(true);
              return;
            }
            setLivePrice(data.price);
            setLiveChartData((prev) => {
              const newEntry = {
                x: new Date(data.timestamp),
                y: data.price,
              };
              const updated = [...prev, newEntry];
              return updated.slice(-30);
            });
          } catch (parseError) {
            console.error("Error parsing WebSocket data:", parseError);
          }
        };

        ws.onclose = (event) => {
          console.log("WebSocket connection closed", event);
          setWsConnected(false);
          // Attempt to reconnect after 3 seconds if not intentionally closed
          if (event.code !== 1000) {
            setTimeout(connectWebSocket, 3000);
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          setBackendError(true);
          setWsConnected(false);
        };
      } catch (error) {
        console.error("Error creating WebSocket:", error);
        setBackendError(true);
      }
    };

    // Reset chart data when ticker changes
    setLiveChartData([]);
    setLivePrice(null);

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close(1000); // Normal closure
      }
    };
  }, [currentTicker]);

  // --- Trading Logic & UI Handlers ---
  const handleTrade = (type) => {
    if (!livePrice) return;
    setTrades((prev) => prev + 1);
    const change = type === "buy" ? 100 : -100; // More realistic trade amounts
    setPnl((prev) => prev + change);
    setPortfolioValue((prev) => prev + change);
  };

  const handleBacktest = async () => {
    setLoading(true);
    setBackendError(false);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/backtest", {
        ticker: currentTicker,
        strategy: "Moving Average Crossover",
      });
      setBacktestResults(response.data);
    } catch (error) {
      console.error("Error running backtest:", error);
      setBackendError(true);
    } finally {
      setLoading(false);
    }
  };

  // --- Chart Data & Options ---
  const chartData = {
    labels: liveChartData.map((d) => d.x.toLocaleTimeString()),
    datasets: [
      {
        label: `${currentTicker} Live Price`,
        data: liveChartData.map((d) => d.y),
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        ticks: {
          color: "#A0A0A0",
          maxTicksLimit: 10,
        },
        grid: { color: "#333" },
      },
      y: {
        ticks: {
          color: "#A0A0A0",
          callback: function (value) {
            return formatCurrency(value);
          },
        },
        grid: { color: "#333" },
      },
    },
    plugins: {
      legend: { labels: { color: "white" } },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null)
              label += formatCurrency(context.parsed.y);
            return label;
          },
        },
      },
    },
    animation: {
      duration: 0, // Disable animations for real-time data
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
              <div className="flex justify-between items-center pb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back! Here's your trading overview
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Last Updated</div>
            <div className="text-white font-medium">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-auto">
                <label
                  htmlFor="ticker-input"
                  className="block text-sm font-medium text-gray-400"
                >
                  Stock Ticker
                </label>
                <input
                  id="ticker-input"
                  type="text"
                  value={currentTicker}
                  onChange={(e) =>
                    setCurrentTicker(e.target.value.toUpperCase())
                  }
                  placeholder="e.g., AAPL"
                  className="mt-1 block w-full md:w-48 rounded-md bg-gray-800 border border-gray-700 text-white shadow-sm focus:border-green-400 focus:ring-1 focus:ring-green-400 sm:text-sm p-2"
                />
              </div>
              <div className="flex-1 w-full md:w-auto">
                <h2 className="text-3xl font-bold tracking-tight text-center md:text-left">
                  Live Simulation Dashboard
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    wsConnected ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                <span className="text-sm text-gray-400">
                  {wsConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>

            {backendError && (
              <div className="bg-red-900 text-red-100 p-4 rounded-lg flex items-center justify-center space-x-2">
                <span>⚠️</span>
                <span>
                  Backend connection error. Please ensure your FastAPI server is
                  running at http://127.0.0.1:8000.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-300">
                  Total P&L
                </h3>
                <div
                  className={`text-3xl font-bold mt-2 ${
                    pnl >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {formatCurrency(pnl)}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {pnl >= 0 ? "Profit" : "Loss"}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-300">
                  Portfolio Value
                </h3>
                <div className="text-3xl font-bold text-white mt-2">
                  {formatCurrency(portfolioValue)}
                </div>
                <div className="text-sm text-gray-400 mt-1">Simulated</div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-300">
                  Live Price ({currentTicker})
                </h3>
                <div className="text-3xl font-bold text-white mt-2">
                  {livePrice ? formatCurrency(livePrice) : "N/A"}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Real-time mock feed
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-300">
                  Total Trades
                </h3>
                <div className="text-3xl font-bold text-white mt-2">
                  {trades}
                </div>
                <div className="text-sm text-gray-400 mt-1">Executed</div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">
                  Live Price Chart
                </h3>
                <div className="text-sm text-gray-400">Last 30 data points</div>
              </div>
              <div className="h-[400px] w-full">
                {liveChartData.length > 0 ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="animate-pulse text-2xl mb-2">📊</div>
                      <div>Waiting for live data...</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleTrade("buy")}
                className="w-full md:w-auto px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition font-bold text-lg"
                disabled={!livePrice || loading}
              >
                Buy Signal
              </button>
              <button
                onClick={() => handleTrade("sell")}
                className="w-full md:w-auto px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition font-bold text-lg"
                disabled={!livePrice || loading}
              >
                Sell Signal
              </button>
              <button
                onClick={handleBacktest}
                className="w-full md:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition font-bold text-lg"
                disabled={loading}
              >
                {loading ? "Backtesting..." : "Run Backtest"}
              </button>
            </div>

            {backtestResults && (
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold">Backtest Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg">
                      Total PnL:
                      <span
                        className={`font-bold ml-2 ${
                          backtestResults.pnl >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {formatCurrency(backtestResults.pnl)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">
                      Total Trades:
                      <span className="font-bold text-white ml-2">
                        {backtestResults.trades}
                      </span>
                    </p>
                  </div>
                </div>

                {backtestResults.equity_curve && (
                  <>
                    <h4 className="text-lg mt-6 mb-4">Equity Curve</h4>
                    <div className="h-[300px] w-full">
                      <Line
                        data={{
                          labels: backtestResults.equity_curve.map(
                            (_, i) => `Day ${i + 1}`
                          ),
                          datasets: [
                            {
                              label: "Portfolio Value",
                              data: backtestResults.equity_curve,
                              borderColor: "#4ade80",
                              backgroundColor: "rgba(74, 222, 128, 0.1)",
                              tension: 0.4,
                              pointRadius: 3,
                              pointBackgroundColor: "#4ade80",
                              pointBorderColor: "#fff",
                              pointBorderWidth: 2,
                              fill: true,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: {
                              ticks: { color: "#A0A0A0" },
                              grid: { color: "#333" },
                            },
                            y: {
                              ticks: {
                                color: "#A0A0A0",
                                callback: function (value) {
                                  return formatCurrency(value);
                                },
                              },
                              grid: { color: "#333" },
                            },
                          },
                          plugins: {
                            legend: { labels: { color: "white" } },
                            tooltip: {
                              callbacks: {
                                label: function (context) {
                                  return `Portfolio Value: ${formatCurrency(
                                    context.parsed.y
                                  )}`;
                                },
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <div className="max-w-7xl mx-auto space-y-6">
    

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Total Portfolio
                </p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(marketData.totalValue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm font-medium">
                {formatPercent(marketData.dayChangePercent)}
              </span>
              <span className="text-gray-400 text-sm ml-2">vs yesterday</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Day P&L</p>
                <p
                  className={`text-2xl font-bold ${
                    marketData.dayChange >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formatCurrency(marketData.dayChange)}
                </p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mt-4 flex items-center">
              {marketData.dayChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  marketData.dayChange >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {Math.abs(marketData.dayChange)} today
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Active Positions
                </p>
                <p className="text-2xl font-bold text-white">
                  {marketData.positions}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-gray-400 text-sm">
                Across different sectors
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Win Rate</p>
                <p className="text-2xl font-bold text-white">
                  {marketData.winRate}%
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm font-medium">
                +2.3% this month
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Portfolio Performance
            </h3>
            <div className="h-80">
              <Line data={portfolioChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Weekly Trading Volume
            </h3>
            <div className="h-80">
              <Bar data={volumeChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activity and Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Recent Trades
            </h3>
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.type === "BUY"
                          ? "bg-green-900 text-green-400"
                          : "bg-red-900 text-red-400"
                      }`}
                    >
                      {trade.type}
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {trade.symbol}
                      </div>
                      <div className="text-sm text-gray-400">
                        {trade.quantity} shares @ {formatCurrency(trade.price)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{trade.time}</div>
                    <div
                      className={`text-sm font-medium ${
                        trade.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {trade.pnl >= 0 ? "+" : ""}
                      {formatCurrency(trade.pnl)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Top Movers
            </h3>
            <div className="space-y-3">
              {topPerformers.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {stock.symbol}
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatCurrency(stock.value)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium flex items-center ${
                        stock.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {formatPercent(stock.change)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Status Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Market Status
              </h3>
              <p className="text-gray-300 mt-1">
                US Markets are currently open • Next close in 4h 23m
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">S&P 500</div>
              <div className="text-lg font-semibold text-white">4,567.89</div>
              <div className="text-sm text-green-400">+0.67%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

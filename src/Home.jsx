import React from "react";
import {
  TrendingUp,
  BarChart3,
  Shield,
  Target,
  PlayCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Smart Trading Strategies",
      description:
        "AI-powered moving averages, RSI, and Bollinger Bands with real-time market signals",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Live Data & Backtesting",
      description:
        "Real-time market feeds with comprehensive historical analysis and performance metrics",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Advanced Risk Management",
      description:
        "Intelligent stop-loss protection, position sizing, and portfolio risk controls",
      gradient: "from-purple-500 to-violet-600",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Paper Trading Sandbox",
      description:
        "Practice with virtual capital in a realistic trading environment before going live",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const strategies = [
    {
      name: "Moving Average Crossover",
      description:
        "Advanced trend-following strategy using SMA/EMA crossovers with dynamic timeframes",
      risk: "Medium",
      winRate: "68%",
      riskColor: "text-yellow-400",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      name: "RSI Momentum",
      description:
        "High-frequency momentum strategy using overbought/oversold signals with ML optimization",
      risk: "High",
      winRate: "72%",
      riskColor: "text-red-400",
      bgGradient: "from-red-500/20 to-pink-500/20",
    },
    {
      name: "Bollinger Bands",
      description:
        "Mean reversion strategy using statistical price extreme identification and volatility analysis",
      risk: "Low",
      winRate: "65%",
      riskColor: "text-emerald-400",
      bgGradient: "from-emerald-500/20 to-green-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900/50 to-slate-950"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="mb-6 inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">
            Next-Generation Trading Platform
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Algorithmic Trading
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Simulator
          </span>
        </h1>

        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Build, test, and deploy sophisticated trading strategies with our
          AI-powered platform. Experience professional-grade backtesting,
          real-time market simulation, and risk management tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/dashboard">
            <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40">
              <PlayCircle className="w-5 h-5 group-hover:animate-pulse" />
              Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link to="/strategies">
            <button className="group border border-slate-600 hover:border-emerald-500/50 bg-slate-800/50 hover:bg-slate-700/50 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg backdrop-blur-sm">
              <span className="group-hover:text-emerald-400 transition-colors">
                Explore Strategies
              </span>
            </button>
          </Link>
        </div>

        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 mx-auto text-slate-500" />
        </div>
      </section>

      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Professional Trading Tools
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to succeed in algorithmic trading, powered by
              cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32 pt-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Battle-Tested Strategies
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Proven algorithmic strategies with transparent performance metrics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${strategy.bgGradient} p-1 rounded-2xl hover:scale-105 transition-all duration-300`}
            >
              <div className="bg-slate-900/95 p-8 rounded-xl h-full backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-3 group-hover:text-emerald-400 transition-colors">
                  {strategy.name}
                </h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {strategy.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Risk Level
                      </span>
                      <span className={`${strategy.riskColor} font-semibold`}>
                        {strategy.risk}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Win Rate
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        {strategy.winRate}
                      </span>
                    </div>
                  </div>
                  <Globe className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-24  ">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 border border-gray-700 rounded-3xl p-12 backdrop-blur-md shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Elevate Your Trading Strategy
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto text-center">
              Discover a smarter way to trade with a platform built for
              precision and performance. Simulate your strategies in a risk-free
              environment and gain a competitive edge.
            </p>
            <div className="flex justify-center">
              <Link to="/dashboard">
                <button className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-lg text-white rounded-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-green-500/50">
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 transition-transform duration-300 group-hover:scale-110"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center gap-3">
                    Start Trading Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

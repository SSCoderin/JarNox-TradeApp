import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-900 backdrop-blur-sm border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center space-x-2 justify-center md:justify-start mb-2">
                <Link to ="/">
              <h3 className="font-bold text-xl text-white">
                AlgoTrader<span className="text-emerald-400">Sim</span>
              </h3>
              </Link>
            </div>
            <p className="text-slate-400">
              Professional algorithmic trading simulation
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link
              to="/dashboard"
              className="text-slate-400 hover:text-emerald-400 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/strategies"
              className="text-slate-400 hover:text-emerald-400 transition-colors font-medium"
            >
              Strategies
            </Link>
            <Link
              to="/portfolio"
              className="text-slate-400 hover:text-emerald-400 transition-colors font-medium"
            >
              Portfolio
            </Link>
            <Link
              to="/analytics"
              className="text-slate-400 hover:text-emerald-400 transition-colors font-medium"
            >
              Analytics
            </Link>
            <Link
              to="/settings"
              className="text-slate-400 hover:text-emerald-400 transition-colors font-medium"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// src/pages/Dashboard.jsx
export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
      <p className="text-gray-700">
        Welcome to the AlgoTraderSim dashboard!  
        Here you’ll be able to:
      </p>
      <ul className="list-disc list-inside mt-3 space-y-1 text-gray-600">
        <li>View live price charts</li>
        <li>Track running strategies and signals</li>
        <li>Monitor portfolio performance (PnL, exposure)</li>
        <li>Access quick links to Strategies, Portfolio, and Settings</li>
      </ul>
    </div>
  );
}

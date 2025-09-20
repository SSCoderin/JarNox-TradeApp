export default function Strategies() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Strategies</h2>
      <p className="text-gray-700">
        Here you can create, view, and manage your algorithmic trading strategies.
      </p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">My Strategies</h3>
        <ul className="bg-white rounded-md shadow p-4 space-y-2">
          <li className="p-2 border-b">Moving Average Crossover</li>
          <li className="p-2 border-b">RSI-based Momentum</li>
          <li className="p-2">Bollinger Band Squeeze</li>
        </ul>
      </div>
    </div>
  );
}
export default function Portfolio() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💼 Portfolio</h2>
      <p className="text-gray-700">
        Monitor your portfolio's performance, view current holdings, and track
        your profit and loss.
      </p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-green-100 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold text-green-700">Total PnL</h3>
          <p className="text-3xl font-bold text-green-600">+$1,542.89</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold text-blue-700">Current Value</h3>
          <p className="text-3xl font-bold text-blue-600">$101,542.89</p>
        </div>
      </div>
    </div>
  );
}
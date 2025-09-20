export default function Settings() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>
      <p className="text-gray-700">
        Configure your account settings, API integrations, and other preferences.
      </p>
      <div className="mt-6 bg-white rounded-md shadow p-6">
        <h3 className="text-xl font-semibold mb-3">API Keys</h3>
        <p className="text-gray-600">
          Enter your brokerage API keys to connect your trading account.
        </p>
        <div className="mt-4">
          <label className="block text-gray-700">API Key:</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="****************"
          />
        </div>
      </div>
    </div>
  );
}
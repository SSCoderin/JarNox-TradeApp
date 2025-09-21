import { useUser } from "@clerk/clerk-react";

export default function Settings() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-2xl shadow-lg p-8 border border-green-400">
        <h2 className="text-2xl font-bold mb-6 text-green-400">Account Settings</h2>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-green-400"
            />
            <div>
              <h3 className="text-xl font-semibold">{user.fullName}</h3>
              <p className="text-gray-400">Member since {new Date(user.createdAt).toDateString()}</p>
            </div>
          </div>

          <div className="gap-6 flex flex-col">
            <div>
              <label className="block text-sm text-gray-400">Full Name</label>
              <div className="mt-1 p-3 rounded-lg bg-gray-700">{user.fullName}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <div className="mt-1 p-3 rounded-lg bg-gray-700">
                {user.emailAddresses[0].emailAddress}
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </div>
  );
}

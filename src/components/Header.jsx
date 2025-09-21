import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn } = useAuth();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Strategies", path: "/strategies" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md p-2 border-b border-green-400  backdrop-filter: blur(10px)">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to ="/" className="cursor-pointer">
        <h1 className="text-xl font-bold tracking-wide">
          AlgoTrader<span className="text-green-400">Sim</span>
        </h1>
        </Link>

        <nav className="hidden md:flex space-x-6">

          {isSignedIn && (
            <>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-green-400 transition ${
                location.pathname === link.path ? "text-green-400" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          </>
          )}

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hover:text-green-400 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block hover:text-green-400 ${
                location.pathname === link.path ? "text-green-400" : ""
              }`}
              onClick={() => setIsOpen(false)} 
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

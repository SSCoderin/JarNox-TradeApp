import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Portfolio from "./pages/Portfolio";
import Strategies from "./pages/Strategies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

const storeuserdata = async (userId, fullName, email) => {
  try {
    console.log("sending data", userId, fullName, email);
    const repo = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/create`,
      {
        userid: userId,
        name: fullName,
        email: email,
      }
    );
    if (repo.status === 200) {
      console.log(repo.data);
    }
  } catch (error) {
    console.log(error);
  }
};

function ProtectedRoute({ children }) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    if (isSignedIn && user) {
      storeuserdata(
        user.id,
        user.fullName,
        user.emailAddresses[0].emailAddress
      );
    }
  }, [isSignedIn, user]);

  return isSignedIn ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/strategies"
          element={
            <ProtectedRoute>
              <Strategies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

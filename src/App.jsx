import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Portfolio from "./pages/Portfolio";
import Strategies from "./pages/Strategies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

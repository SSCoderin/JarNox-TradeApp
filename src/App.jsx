import Home from "./pages/home";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

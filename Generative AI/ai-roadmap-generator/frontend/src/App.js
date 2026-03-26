import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Roadmap from "./Roadmap";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "sans-serif" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />

          {/* ✅ Optional: Fallback Route (prevents blank page) */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>404 - Page Not Found</h2>
                <p>Oops! The page you're looking for doesn't exist.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
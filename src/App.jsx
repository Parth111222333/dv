import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Agriculture from "./Agriculture";  // ✅ your form page
import Report from "./Report";            // ✅ pdf report page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;






















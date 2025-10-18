import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Agriculture from "./Agriculture";  // ✅ your form page
import Report from "./Report";            // ✅ pdf report page
import Rcc from "./Rcc";
import Report2 from "./Report2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/report" element={<Report />} />
        <Route path="/Rcc" element={<Rcc/>}/>
         <Route path="/report2" element={<Report2/>}/>
      </Routes>
    </Router>
  );
}

export default App;






















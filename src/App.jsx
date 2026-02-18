import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Market from "./Pages/Market";
import Charts from "./Pages/Charts";
import Portfolio from "./Pages/Portfolio";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={Market} />
          <Route path="/charts" element={Charts} />
          <Route path="/portfolio" element={Portfolio} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

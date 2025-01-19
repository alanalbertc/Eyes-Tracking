import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SubcategoriaPage from "./components/SubCategoriaPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subcategoria-1" element={<SubcategoriaPage subcategoria="1" />} />
        <Route path="/subcategoria-2" element={<SubcategoriaPage subcategoria="2" />} />
        <Route path="/subcategoria-3" element={<SubcategoriaPage subcategoria="3" />} />
      </Routes>
    </Router>
  );
};

export default App;

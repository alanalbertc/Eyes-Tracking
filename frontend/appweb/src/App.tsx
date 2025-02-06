import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import SubcategoriaPage from "./components/SubCategoriaPage";
import SecondCarouselPage from "./components/SecondCarouselPage";

const App: React.FC = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:categoriaId" element={<SecondCarouselPage />} />
                        <Route
                            path="/:categoriaId/:id"
                            element={<SubcategoriaPage />}
                        />
                    </Routes>
                </Router>
            </div>
        </>
    );
};

export default App;

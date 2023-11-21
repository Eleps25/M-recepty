/* import "./App.css"; */
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RecipeDetailPage from "./components/RecipeDetailPage/RecipeDetailPage";
import RecipeList from "./components/RecipeList/RecipeList";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipelist" element={<RecipeList />} />
        <Route path="/recipelist/:id" element={<RecipeDetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

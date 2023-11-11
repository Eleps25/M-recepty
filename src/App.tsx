import "./App.css";
import Home from "./components/Home/Home";
import RecipeDetailPage from "./components/RecipeDetailPage/RecipeDetailPage";
import RecipeList from "./components/RecipeList/RecipeList";

import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipelist" element={<RecipeList />} />
        <Route path="/recipelist/:id" element={<RecipeDetailPage />} />
      </Routes>
    </>
  );
}

export default App;

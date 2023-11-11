import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import RecipeDetailPage from "./components/RecipeDetailPage/RecipeDetailPage";
import RecipeList from "./components/RecipeList/RecipeList";

function App() {
  return (
    <>
      <Header />
      <Home />
      <RecipeList />
      <RecipeDetailPage />
      <Footer />
    </>
  );
}

export default App;

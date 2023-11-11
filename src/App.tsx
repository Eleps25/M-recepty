import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Recipe from "./components/Recipe/Recipe";
import RecipeAddForm from "./components/RecipeAddForm/RecipeAddForm";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import RecipeDetailPage from "./components/RecipeDetailPage/RecipeDetailPage";
import RecipeEdit from "./components/RecipeEdit/RecipeEdit";
import RecipeList from "./components/RecipeList/RecipeList";

function App() {
  return (
    <>
      <Header />
      <Home />
      <RecipeList />
      <Recipe />
      <RecipeAddForm />
      <RecipeDetailPage />
      <RecipeDetail />
      <RecipeEdit />
      <Footer />
    </>
  );
}

export default App;

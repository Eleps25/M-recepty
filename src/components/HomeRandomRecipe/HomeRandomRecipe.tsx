import HomeRecipe from "../HomeRecipe/HomeRecipe";

import { IRecipeList } from "../../interfaces/RecipeList";

import "./style.css";

interface Props {
  listData: IRecipeList[];
}

const HomeRandomRecipe: React.FC<Props> = (props) => {
  const recipes: IRecipeList[] = props.listData;
  const randomRecipeNumber = Math.floor(Math.random() * recipes.length);
  const randomRecipe: IRecipeList = recipes[randomRecipeNumber];
  return (
    <div className="randomRecipe-container">
      <h1>Random Recipe</h1>
      <HomeRecipe recipeData={randomRecipe} key={randomRecipe.id} />
    </div>
  );
};

export default HomeRandomRecipe;

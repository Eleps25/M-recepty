import HomeRecipe from "../HomeRecipe/HomeRecipe";

import { IRecipeList } from "../../interfaces/RecipeList";

import "./style.css";

interface Props {
  listData: IRecipeList[];
  imageListSrc: string[];
}

const HomeRandomRecipe: React.FC<Props> = (props) => {
  const recipes: IRecipeList[] = props.listData;
  const randomRecipeNumber = Math.floor(Math.random() * recipes.length);
  const randomRecipe: IRecipeList = recipes[randomRecipeNumber];
  const recipeImageSrcIndex = props.imageListSrc.findIndex((element) =>
    element.includes(randomRecipe.id)
  );
  const recipeImageSrc = props.imageListSrc[recipeImageSrcIndex];

  return (
    <div className="randomRecipe-container">
      <h1>Náhodný recept</h1>
      <HomeRecipe
        recipeData={randomRecipe}
        key={randomRecipe.id}
        imgSrc={recipeImageSrc}
      />
    </div>
  );
};

export default HomeRandomRecipe;

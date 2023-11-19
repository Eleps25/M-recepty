import { IRecipeList } from "../../interfaces/RecipeList";

import HomeRecipe from "../HomeRecipe/HomeRecipe";

import CardGroup from "react-bootstrap/CardGroup";
import "./style.css";

interface Props {
  listData: IRecipeList[];
  imageListSrc: string[];
}

const HomeMostPrepared: React.FC<Props> = (props) => {
  const recipes = props.listData;

  const showMostPrepared = () => {
    return recipes
      .sort(
        (firstRec, secondRec) => secondRec.cookedNumber - firstRec.cookedNumber
      )
      .slice(0, 3)
      .map((recipe) => {
        const recipeImageSrcIndex = props.imageListSrc.findIndex((element) =>
          element.includes(recipe.id)
        );
        const recipeImageSrc = props.imageListSrc[recipeImageSrcIndex];

        return (
          <HomeRecipe
            recipeData={recipe}
            key={recipe.id}
            imgSrc={recipeImageSrc}
          />
        );
      });
  };

  return (
    <div className="mostPrepared-container">
      <h1>Top 3 recepty</h1>
      <CardGroup>{showMostPrepared()}</CardGroup>
    </div>
  );
};

export default HomeMostPrepared;

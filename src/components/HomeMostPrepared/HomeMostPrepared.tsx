import { IRecipeList } from "../../interfaces/RecipeList";

import HomeRecipe from "../HomeRecipe/HomeRecipe";

import CardGroup from "react-bootstrap/CardGroup";
import "./style.css";

interface Props {
  listData: IRecipeList[];
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
        return <HomeRecipe recipeData={recipe} key={recipe.id} />;
      });
  };

  return (
    <div className="mostPrepared-container">
      <h1>Most prepared</h1>
      <CardGroup>{showMostPrepared()}</CardGroup>
    </div>
  );
};

export default HomeMostPrepared;

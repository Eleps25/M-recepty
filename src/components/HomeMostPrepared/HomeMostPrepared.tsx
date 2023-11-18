import { IRecipeList } from "../../interfaces/RecipeList";

import HomeRecipe from "../HomeRecipe/HomeRecipe";

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
    <div>
      <h1>Most prepared</h1>
      {showMostPrepared()}
    </div>
  );
};

export default HomeMostPrepared;

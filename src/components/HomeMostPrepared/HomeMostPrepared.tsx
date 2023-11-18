import { IRecipeList } from "../../interfaces/RecipeList";

import HomeMostPreparedRecipe from "../HomeMostPreparedRecipe/HomeMostPreparedRecipe";

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
        return <HomeMostPreparedRecipe recipeData={recipe} key={recipe.id} />;
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

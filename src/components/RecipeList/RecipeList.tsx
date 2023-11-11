import Recipe from "../Recipe/Recipe";
import RecipeAddForm from "../RecipeAddForm/RecipeAddForm";

const RecipeList: React.FC = () => {
  return (
    <div>
      <h1>Seznam receptů</h1>
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <RecipeAddForm />
    </div>
  );
};

export default RecipeList;

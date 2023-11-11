import Recipe from "../Recipe/Recipe";
import RecipeAddForm from "../RecipeAddForm/RecipeAddForm";

export default function RecipeList() {
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
}

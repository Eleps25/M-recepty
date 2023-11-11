import RecipeDetail from "../RecipeDetail/RecipeDetail";
import RecipeEdit from "../RecipeEdit/RecipeEdit";

export default function RecipeDetailPage() {
  return (
    <div>
      <h1>Stránka detailu receptu</h1>
      <RecipeDetail />
      <RecipeEdit />
    </div>
  );
}

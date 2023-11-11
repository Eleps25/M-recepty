import RecipeDetail from "../RecipeDetail/RecipeDetail";
import RecipeEdit from "../RecipeEdit/RecipeEdit";

const RecipeDetailPage: React.FC = () => {
  return (
    <div>
      <h1>Stránka detailu receptu</h1>
      <RecipeDetail />
      <RecipeEdit />
    </div>
  );
};

export default RecipeDetailPage;

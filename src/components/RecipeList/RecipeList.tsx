import { useState, useEffect } from "react";

import { IRecipe } from "../../interfaces/Recipe";
/* import { IRecipeList } from "../../interfaces/RecipeList"; */

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import Recipe from "../Recipe/Recipe";
import RecipeAddForm from "../RecipeAddForm/RecipeAddForm";

import Button from "react-bootstrap/Button";

interface IRecipeList extends IRecipe {
  id: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipeList[]>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const recipesCollectionRef = collection(db, "recipes");

  const getRecipeList = async () => {
    try {
      const data = await getDocs(recipesCollectionRef);
      const filteredData: any = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipes(filteredData);
      setIsLoad(true);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  return (
    <div>
      <h1>Seznam receptů</h1>
      {isAdding ? <RecipeAddForm toggleAdd={setIsAdding} /> : null}
      {isLoad
        ? recipes.map((recipe) => {
            return <Recipe recipeData={recipe} key={recipe.id} />;
          })
        : "Loading"}
      {isAdding ? null : (
        <Button onClick={() => setIsAdding(true)}>Přidat recept</Button>
      )}
    </div>
  );
};

export default RecipeList;

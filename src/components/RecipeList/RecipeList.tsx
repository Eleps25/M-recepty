import { useState, useEffect } from "react";

import { IRecipe } from "../../interfaces/Recipe";
/* import { IRecipeList } from "../../interfaces/RecipeList"; */

import { collection, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
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

  const updateFavourite = async (recipe) => {
    const recipeDoc = doc(db, "recipes", recipe.id);
    try {
      await updateDoc(recipeDoc, {isFavourite: !recipe.isFavourite})
    
      getRecipeList();
    } catch (err) {
      console.log(err);
    }
  }

  const deleteRecipe = async (id: string) => {
    const recipeDoc = doc(db, "recipes", id);
    try {
      await deleteDoc(recipeDoc);

      getRecipeList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Seznam receptů</h1>
      {isAdding ? (
        <RecipeAddForm toggleAdd={setIsAdding} getList={getRecipeList} />
      ) : null}
      {isLoad
        ? recipes.map((recipe) => {
            return <Recipe recipeData={recipe} key={recipe.id} deleteRecipe={() => deleteRecipe(recipe.id)} updateRecipeFavourite={() => updateFavourite(recipe)}/>;
          })
        : "Loading"}
      {isAdding ? null : (
        <Button onClick={() => setIsAdding(true)}>Přidat recept</Button>
      )}
    </div>
  );
};

export default RecipeList;

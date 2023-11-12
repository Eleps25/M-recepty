import { useState, useEffect } from "react";

import { IRecipe } from "../../interfaces/Recipe";
/* import { IRecipeList } from "../../interfaces/RecipeList"; */

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import Recipe from "../Recipe/Recipe";
import RecipeAddForm from "../RecipeAddForm/RecipeAddForm";

 interface IRecipeList extends IRecipe {
  id: string;
} 

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipeList[]>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

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
      console.log(err);
    }
  };

  useEffect(() => {
    getRecipeList();
    console.log("useEffect: ", recipes)
  }, []);

  return (
    <div>
      <h1>Seznam receptů</h1>
      {isLoad? recipes.map((recipe) => {return <Recipe recipeData={recipe} key={recipe.id}/>}) : "Loading"}
      <RecipeAddForm />
    </div>
  );
};

export default RecipeList;

import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import { IRecipeList } from "../../interfaces/RecipeList";
import HomeMostPreparedRecipe from "../HomeMostPreparedRecipe/HomeMostPreparedRecipe";

const HomeMostPrepared: React.FC = () => {
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
      throw new Error(err);
    }
  };

  const showMostPrepared = () => {
    if (!isLoad) {
      return "Loading...";
    }
    return recipes
      .sort(
        (firstRec, secondRec) => secondRec.cookedNumber - firstRec.cookedNumber
      )
      .slice(0, 3)
      .map((recipe) => {
        console.log(recipes)
        return <HomeMostPreparedRecipe recipeData={recipe} key={recipe.id} />;
      });
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  return (
    <div>
      <h1>Most prepared</h1>
      {isLoad ? showMostPrepared() : "Loading"}
    </div>
  );
};

export default HomeMostPrepared;

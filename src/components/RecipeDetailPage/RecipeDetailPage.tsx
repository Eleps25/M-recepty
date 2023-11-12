import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import { IRecipe } from "../../interfaces/Recipe";

import RecipeDetail from "../RecipeDetail/RecipeDetail";
import RecipeEdit from "../RecipeEdit/RecipeEdit";

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<IRecipe>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const docRef: any = doc(db, "recipes", id);

  useEffect(() => {
    const getRecipeData = async () => {
      try {
        const data = await getDoc(docRef);
        const filteredData: any = data.data();
        setRecipeData(filteredData);
        setIsLoad(true);
      } catch (err) {
        throw new Error(err);
      }
    };

    getRecipeData();
  }, []);
  return (
    <div>
      <h1>Stránka detailu receptu</h1>
      {isLoad ? (
        <RecipeDetail id={id} recipeData={recipeData} key={id} />
      ) : (
        "Loading"
      )}
      <RecipeEdit />
    </div>
  );
};

export default RecipeDetailPage;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import { IRecipe } from "../../interfaces/Recipe";

import RecipeDetail from "../RecipeDetail/RecipeDetail";
import RecipeEdit from "../RecipeEdit/RecipeEdit";

import Button from "react-bootstrap/Button";

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<IRecipe>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const docRef: any = doc(db, "recipes", id);

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

  useEffect(() => {
    getRecipeData();
  }, []);

  const handleIncreaseCookedNumber = async () => {
    const recipeDoc = doc(db, "recipes", id);
    try{
      await updateDoc(recipeDoc, {cookedNumber: recipeData.cookedNumber + 1});

      getRecipeData();
    } catch(err) {
      console.log(err)
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };


  const handleShow = () => {
    if (!isLoad) {
      return "Loading...";
    } else if (isEditing) {
      return <RecipeEdit stopEdit={handleEdit} recipeData={recipeData} id={id}/>;
    } else {
      return <RecipeDetail id={id} recipeData={recipeData} key={id} startEdit={handleEdit} increaseCookedNumber={handleIncreaseCookedNumber} />;
    }
  };

  return (
    <div>
      <h1>Stránka detailu receptu</h1>
      {handleShow()}
    </div>
  );
};

export default RecipeDetailPage;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import { IRecipe } from "../../interfaces/Recipe";

import RecipeDetail from "../RecipeDetail/RecipeDetail";
import RecipeEdit from "../RecipeEdit/RecipeEdit";

import passwordCheck from "../../HelperFunctions/passwordCheck.js";

import Spinner from "react-bootstrap/Spinner";
import "./style.css";

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<IRecipe>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [imageList, setImageList] = useState([]);
  const [imagesIsLoad, setImagesIsLoad] = useState(false);

  const docRef: any = doc(db, "recipes", id);
  const imageListRef = ref(storage, "recipes/");

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

  const getImageList = () => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          setImagesIsLoad(true);
        });
      });
    });
  };

  useEffect(() => {
    getRecipeData();
    getImageList();
  }, []);

  const handleIncreaseCookedNumber = async () => {
    const recipeDoc = doc(db, "recipes", id);
    if (!passwordCheck()) {
      return;
    }

    try {
      await updateDoc(recipeDoc, { cookedNumber: recipeData.cookedNumber + 1 });

      getRecipeData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleShow = () => {
    if (!isLoad && !imagesIsLoad) {
      return <Spinner animation="border" />;
    } else if (isEditing) {
      return (
        <div className="detailPage-content">
          <h1>{recipeData.title} - úprava</h1>
          <RecipeEdit stopEdit={handleEdit} recipeData={recipeData} id={id} />
        </div>
      );
    } else {
      const recipeImageSrcIndex = imageList.findIndex((element) =>
        element.includes(id)
      );
      const recipeImageSrc = imageList[recipeImageSrcIndex];

      return (
        <div className="detailPage-content">
          <h1>{recipeData.title}</h1>
          <RecipeDetail
            id={id}
            recipeData={recipeData}
            key={id}
            startEdit={handleEdit}
            increaseCookedNumber={handleIncreaseCookedNumber}
            imageSrc={recipeImageSrc}
          />
        </div>
      );
    }
  };

  return handleShow();
};

export default RecipeDetailPage;

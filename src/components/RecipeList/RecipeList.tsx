import { useState, useEffect } from "react";

import { IRecipe } from "../../interfaces/Recipe";
/* import { IRecipeList } from "../../interfaces/RecipeList"; */

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

import Recipe from "../Recipe/Recipe";
import RecipeAddForm from "../RecipeAddForm/RecipeAddForm";

import passwordCheck from "../../HelperFunctions/passwordCheck.js";
import sortItems from "../../HelperFunctions/sortFn.js";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import "./style.css";

interface IRecipeList extends IRecipe {
  id: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipeList[]>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [isAscSorted, setIsAscSorted] = useState<boolean>(false);
  const [sortedCol, setSortedCol] = useState<string>("id");

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
    if (!passwordCheck()) {
      return;
    }

    const recipeDoc = doc(db, "recipes", recipe.id);
    try {
      await updateDoc(recipeDoc, { isFavourite: !recipe.isFavourite });

      getRecipeList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecipe = async (id: string) => {
    if (!passwordCheck()) {
      return;
    }

    const recipeDoc = doc(db, "recipes", id);
    try {
      await deleteDoc(recipeDoc);

      getRecipeList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="recipeList-container">
      <h1>Seznam receptů</h1>
      {isLoad ? (
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "title",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Sort by title
        </Button>
      ) : null}
      {isLoad ? (
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "difficulty",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Sort by difficulty
        </Button>
      ) : null}
      {isAdding ? null : (
        <Button
          onClick={() => setIsAdding(true)}
          className="recipeList-addButton"
        >
          Přidat recept
        </Button>
      )}
      {isAdding ? (
        <RecipeAddForm toggleAdd={setIsAdding} getList={getRecipeList} />
      ) : null}
      <Container>
        <Row
          xs="auto"
          sm="auto"
          md="auto"
          lg="auto"
          xl="auto"
          xxl="auto"
          className="justify-content-center"
        >
          {isLoad ? (
            recipes.map((recipe) => {
              return (
                <Col key={recipe.id}>
                  <Recipe
                    recipeData={recipe}
                    deleteRecipe={() => deleteRecipe(recipe.id)}
                    updateRecipeFavourite={() => updateFavourite(recipe)}
                  />
                </Col>
              );
            })
          ) : (
            <Spinner animation="border" />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default RecipeList;

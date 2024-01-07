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
import { storage } from "../../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import Recipe from "../Recipe/Recipe";
import RecipeAddForm from "../RecipeAddForm/RecipeAddForm";
import RecipeListSortBar from "../../components/RecipeListSort/RecipeListSortBar.js";

import passwordCheck from "../../HelperFunctions/passwordCheck.js";
import sortItems from "../../HelperFunctions/sortFn.js";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import "./style.css";

interface IRecipeList extends IRecipe {
  id: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipeList[]>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [imageList, setImageList] = useState([]);
  const [imagesIsLoad, setImagesIsLoad] = useState(false);

  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [isAscSorted, setIsAscSorted] = useState<boolean>(false);
  const [sortedCol, setSortedCol] = useState<string>("id");

  const [showAddedModal, setShowAddedModal] = useState<boolean>(false);
  const [showDeletedModal, setShowDeletedModal] = useState<boolean>(false);

  const recipesCollectionRef = collection(db, "recipes");
  const imageListRef = ref(storage, "recipes/");

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
    getRecipeList();
    getImageList();
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

  const updateSlowCooker = async (recipe) => {
    if (!passwordCheck()) {
      return;
    }

    const recipeDoc = doc(db, "recipes", recipe.id);
    try {
      await updateDoc(recipeDoc, { slowCooker: !recipe.slowCooker });

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
      setShowDeletedModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="recipeList-container">
      <h1>Seznam receptů</h1>
      {isLoad && imagesIsLoad ? (
        <RecipeListSortBar
          sortItems={sortItems}
          recipes={recipes}
          setRecipes={setRecipes}
          isSorted={isSorted}
          setIsSorted={setIsSorted}
          isAscSorted={isAscSorted}
          setIsAscSorted={setIsAscSorted}
          sortedCol={sortedCol}
          setSortedCol={setSortedCol}
        />
      ) : null}
      {isAdding ? null : (
        <Button
          onClick={() => setIsAdding(true)}
          className="recipeList-addButton"
        >
          Přidat recept
        </Button>
      )}
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
          {isLoad && imagesIsLoad ? (
            recipes.map((recipe) => {
              const recipeImageSrcIndex = imageList.findIndex((element) =>
                element.includes(recipe.id)
              );
              const recipeImageSrc = imageList[recipeImageSrcIndex];
              return (
                <Col key={recipe.id}>
                  <Recipe
                    recipeData={recipe}
                    deleteRecipe={() => deleteRecipe(recipe.id)}
                    updateRecipeFavourite={() => updateFavourite(recipe)}
                    updateSlowCooker={() => updateSlowCooker(recipe)}
                    imgSrc={recipeImageSrc}
                  />
                </Col>
              );
            })
          ) : (
            <Spinner animation="border" />
          )}
        </Row>
      </Container>

      <Modal
        show={isAdding}
        onHide={() => setIsAdding(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-add">
          <Modal.Title>Přidat nový recept</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RecipeAddForm toggleAdd={setIsAdding} getList={getRecipeList} setShowAddedModal={setShowAddedModal} />
        </Modal.Body>
      </Modal>

      <Modal
          show={showAddedModal}
          onHide={() => setShowAddedModal(false)}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="modal-add">
            <Modal.Title>Úspěch</Modal.Title>
          </Modal.Header>
          <Modal.Body>Recept úspěšně uložen</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setShowAddedModal(false)}>
              Rozumím
            </Button>
          </Modal.Footer>
        </Modal>

      <Modal
          show={showDeletedModal}
          onHide={() => setShowDeletedModal(false)}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
      <Modal.Header closeButton className="modal-delete">
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Recept smazán</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={() => setShowDeletedModal(false)}>
              Rozumím
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default RecipeList;

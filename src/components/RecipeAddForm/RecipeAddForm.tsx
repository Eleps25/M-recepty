import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

import passwordCheck from "../../HelperFunctions/passwordCheck.js";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./style.css";

interface Props {
  toggleAdd: (arg: boolean) => void;
  getList: () => void;
  setShowAddedModal: (value: React.SetStateAction<boolean>) => void;
}

const RecipeAddForm: React.FC<Props> = (props) => {
  const { getList } = props;

  const [newTitle, setNewTitle] = useState<string>("");
  const [newBook, setNewBook] = useState<string>("");
  const [newPage, setNewPage] = useState<number>(0);
  const [newMealType, setNewMealType] = useState<string>("");
  const [newDifficulty, setNewDifficulty] = useState<string>("");
  const [newPrepareTime, setNewPrepareTime] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");

  const recipesCollectionRef = collection(db, "recipes");

  const addRecipe = async (e) => {
    e.preventDefault();
    if (!passwordCheck()) {
      return;
    }

    try {
      await addDoc(recipesCollectionRef, {
        title: newTitle,
        book: newBook,
        page: newPage,
        mealType: newMealType,
        difficulty: newDifficulty,
        prepareTime: newPrepareTime,
        ingredients: ingredients
          .split(",")
          .map((ingredient) => ingredient.trim()),
        cookedNumber: 0,
        isFavourite: false,
      });
      props.toggleAdd(false);
      getList();
      props.setShowAddedModal(true);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div>
      <Form onSubmit={addRecipe}>
        <Form.Group>
          <Form.Label htmlFor="title">Název:</Form.Label>
          <Form.Control
            id="title"
            name="title"
            type="text"
            required
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="book">Kniha:</Form.Label>
          <Form.Control
            id="book"
            name="book"
            type="text"
            required
            onChange={(e) => setNewBook(e.target.value)}
          />
        </Form.Group>
        <Form.Label htmlFor="page">Strana:</Form.Label>
        <Form.Control
          id="page"
          name="page"
          type="number"
          required
          onChange={(e) => setNewPage(Number(e.target.value))}
        />
        <Form.Label htmlFor="mealType">Typ:</Form.Label>
        <Form.Control
          id="mealType"
          name="mealType"
          type="text"
          required
          onChange={(e) => setNewMealType(e.target.value)}
        />
        <Form.Label htmlFor="difficulty">Náročnost:</Form.Label>
        <Form.Control
          id="difficulty"
          name="difficulty"
          type="text"
          required
          onChange={(e) => setNewDifficulty(e.target.value)}
        />
        <Form.Label htmlFor="prepareTime">Doba přípravy (min):</Form.Label>
        <Form.Control
          id="prepareTime"
          name="prepareTime"
          type="number"
          required
          onChange={(e) => setNewPrepareTime(Number(e.target.value))}
        />
        <Form.Label htmlFor="ingredients">
          Suroviny (oddělit čárkou):
        </Form.Label>
        <Form.Control
          id="ingredients"
          name="ingredients"
          type="textarea"
          required
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
        />
        <section className="addRecipeForm-buttons">
          <Button
            variant="success"
            type="submit"
            className="addRecipeForm-button"
          >
            Přidat
          </Button>
          <Button
            variant="danger"
            onClick={() => props.toggleAdd(false)}
            className="addRecipeForm-button"
          >
            Zpět
          </Button>
        </section>
      </Form>
    </div>
  );
};

export default RecipeAddForm;

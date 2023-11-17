import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

import Button from "react-bootstrap/Button";

interface Props {
  toggleAdd: (arg: boolean) => void;
  getList: () => void;
  
}

const RecipeAddForm: React.FC<Props> = (props) => {
  const {getList} = props

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
    try {
      await addDoc(recipesCollectionRef, {
        title: newTitle,
        book: newBook,
        page: newPage,
        mealType: newMealType,
        difficulty: newDifficulty,
        prepareTime: newPrepareTime,
        ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
        cookedNumber: 0,
        isFavourite: false,
      });
      props.toggleAdd(false);
      getList();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div>
      <h1>Fromulář přidání nového receptu</h1>
      <form onSubmit={addRecipe}>
        <label htmlFor="title">Název:</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label htmlFor="book">Kniha:</label>
        <input
          id="book"
          name="book"
          type="text"
          required
          onChange={(e) => setNewBook(e.target.value)}
        />
        <label htmlFor="page">Strana:</label>
        <input
          id="page"
          name="page"
          type="number"
          required
          onChange={(e) => setNewPage(Number(e.target.value))}
        />
        <label htmlFor="mealType">Typ:</label>
        <input
          id="mealType"
          name="mealType"
          type="text"
          required
          onChange={(e) => setNewMealType(e.target.value)}
        />
        <label htmlFor="difficulty">Náročnost:</label>
        <input
          id="difficulty"
          name="difficulty"
          type="text"
          required
          onChange={(e) => setNewDifficulty(e.target.value)}
        />
        <label htmlFor="prepareTime">Doba přípravy (min):</label>
        <input
          id="prepareTime"
          name="prepareTime"
          type="number"
          required
          onChange={(e) => setNewPrepareTime(Number(e.target.value))}
        />
        <label htmlFor="ingredients">Suroviny (oddělit čárkou):</label>
        <input
          id="ingredients"
          name="ingredients"
          type="textarea"
          required
          onChange={(e) => {setIngredients(e.target.value)}}
        />
        <Button variant="success" type="submit">
          Přidat
        </Button>
      </form>
      <Button variant="danger" onClick={() => props.toggleAdd(false)}>
        Zpět
      </Button>
    </div>
  );
};

export default RecipeAddForm;

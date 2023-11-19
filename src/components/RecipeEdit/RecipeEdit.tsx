import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IRecipe } from "../../interfaces/Recipe";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";

interface Props {
  stopEdit: () => void;
  recipeData: IRecipe;
  id: string;
}

interface EditItem {
  title: string;
  book: string;
  page: number;
  mealType: string;
  difficulty: string;
  prepareTime: number;
  ingredients: string[];
}

const RecipeEdit: React.FC<Props> = (props) => {
  const { ingredients } = props.recipeData;

  const navigate = useNavigate();

  const [startedUpdate, setStartedUpdate] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedRecipe, setUpdatedRecipe] = useState<EditItem>(
    props.recipeData
  );
  const [ingredientList, setIngredientList] = useState<string[]>(ingredients);
  const [newIngredient, setNewIngredient] = useState<string>("");

  const tmpUpdateRecipe = (
    name: string,
    newValue: string | number | string[]
  ) => {
    setUpdatedRecipe({ ...updatedRecipe, [name]: newValue });
    setStartedUpdate(true);
    setIsUpdating(true);
  };

  const updateIngredient = (ingrNewValue: string, ingrIndex: number) => {
    const tmpIngredients: string[] = [...ingredientList];
    tmpIngredients[ingrIndex] = ingrNewValue;
    setIngredientList(tmpIngredients);
    setStartedUpdate(true);
    setIsUpdating(true);
  };

  const updateIngredientList = () => {
    if (!newIngredient) {
      alert("Pole pro novou ingredienci nesmí být prázdné");
      return;
    }
    setIngredientList([...ingredientList, newIngredient]);
    setStartedUpdate(true);
    setIsUpdating(true);
    setNewIngredient("");
  };

  const updateRecipe = async () => {
    if (!startedUpdate) {
      alert("Nebyla provedena žádná změna");
      return;
    }

    const recipeDoc = doc(db, "recipes", props.id);
    try {
      await updateDoc(recipeDoc, {
        ...updatedRecipe,
        ingredients: ingredientList,
      });
      alert("Recipe updated");
      navigate("/recipelist");
    } catch (err) {
      console.log(err);
    }
  };

  const validateUpdate = () => {
    if (isUpdating) {
      if (confirm("Máte neuložené změny. Chcete změny zrušit?")) {
        props.stopEdit();
      } else {
        return;
      }
    } else {
      props.stopEdit();
    }
  };

  const deleteIngredient = (ingr) => {
    console.log(ingr);
    const tmpIngredientList: string[] = ingredientList.filter(
      (ingredient) => ingredient !== ingr
    );
    console.log(tmpIngredientList);
    setIngredientList(tmpIngredientList);
    setStartedUpdate(true);
    setIsUpdating(true);
  };

  return (
    <div className="recipeEdit-container">
      <Row xs={1} md={2}>
        <Form.Group as={Col}>
          <Form.Label>Název</Form.Label>
          <Form.Control
            id="title-id"
            name="title"
            value={updatedRecipe.title}
            onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Typ</Form.Label>
          <Form.Control
            id="mealType-id"
            name="mealType"
            value={updatedRecipe.mealType}
            onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row xs={1} md={2}>
        <Form.Group as={Col}>
          <Form.Label>Kniha</Form.Label>
          <Form.Control
            id="book-id"
            name="book"
            value={updatedRecipe.book}
            onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Strana</Form.Label>
          <Form.Control
            id="page-id"
            name="page"
            value={updatedRecipe.page}
            type="number"
            onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row xs={1} md={2}>
        <Form.Group as={Col}>
          <Form.Label>Náročnost</Form.Label>
          <Form.Control
            id="difficulty-id"
            name="difficulty"
            value={updatedRecipe.difficulty}
            onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Doba přípravy</Form.Label>
          <Form.Control
            id="prepareTime-id"
            name="prepareTime"
            value={updatedRecipe.prepareTime}
            type="number"
            onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Label as={Col}>Ingredience</Form.Label>
      </Row>
      <Form.Group>
        <ul>
          {ingredientList.map((ingredient, index) => {
            return (
              <div
                key={`${ingredient}-${index}-div`}
                className="recipeEdit-ingredientInputs"
              >
                <Form.Control
                  key={index}
                  value={ingredientList[index]}
                  onChange={(e) => updateIngredient(e.target.value, index)}
                />
                <Button
                  key={`${ingredient}-${index}-delBut`}
                  onClick={() => deleteIngredient(ingredient)}
                  variant="danger"
                  className="recipeEidt-ingredientsButton"
                >
                  Smazat ingredienci
                </Button>
              </div>
            );
          })}
        </ul>
        <div className="recipeEdit-newIngredientInput">
          <Form.Control
            id="new-ingredient"
            placeholder="Nová ingredience"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
          />
          <Button
            variant="primary"
            onClick={updateIngredientList}
            className="recipeEidt-ingredientsButton"
          >
            Přidat ingredienci
          </Button>
        </div>
      </Form.Group>
      <div className="recipeEdit-buttonsContainer">
        <Button
          variant="success"
          onClick={() => updateRecipe()}
          className="recipeEdit-FuncButtons"
        >
          Uložit
        </Button>
        <Button
          variant="danger"
          onClick={validateUpdate}
          className="recipeEdit-FuncButtons"
        >
          Zpět
        </Button>
      </div>
    </div>
  );
};

export default RecipeEdit;

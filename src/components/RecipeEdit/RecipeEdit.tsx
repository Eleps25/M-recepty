import { useState } from "react";

import { IRecipe } from "../../interfaces/Recipe";

import Button from "react-bootstrap/Button";

interface Props {
  stopEdit: () => void;
  recipeData: IRecipe;
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
  const { title, book, page, mealType, difficulty, prepareTime, ingredients } =
    props.recipeData;

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedRecipe, setUpdatedRecipe] = useState<EditItem>(
    props.recipeData
  );
  const [ingredientList, setIngredientList] = useState<string[]>(
    props.recipeData.ingredients
  );
  const [newIngredient, setNewIngredient] = useState<string>("");

  const tmpUpdateRecipe = (
    name: string,
    newValue: string | number | string[]
  ) => {
    setUpdatedRecipe({ ...updatedRecipe, [name]: newValue });
    setIsUpdating(true);
  };

  const updateIngredientList = () => {
    setIngredientList([...ingredients, newIngredient]);
    setIsUpdating(true);
  };

  const updateRecipe = () => {
    console.log({ ...updatedRecipe, ingredients: ingredientList });
  };

  const validateUpdate = () => {
    if (isUpdating) {
      if(confirm("Máte neuložené změny. Chcete změny zrušit?")){
        props.stopEdit()
      } else {
        return;
      }
    } else {
      props.stopEdit();
    }
  };

  return (
    <div>
      <h1>Editace receptu</h1>
      <h2>Název: {title}</h2>
      <input
        id="title-id"
        name="title"
        value={updatedRecipe.title}
        onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
      />
      <h2>Kniha: {book}</h2>
      <input
        id="book-id"
        name="book"
        value={updatedRecipe.book}
        onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
      />
      <h2>Strana: {page}</h2>
      <input
        id="page-id"
        name="page"
        value={updatedRecipe.page}
        type="number"
        onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
      />
      <h2>Typ: {mealType}</h2>
      <input
        id="mealType-id"
        name="mealType"
        value={updatedRecipe.mealType}
        onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
      />
      <h2>Náročnost: {difficulty}</h2>
      <input
        id="difficulty-id"
        name="difficulty"
        value={updatedRecipe.difficulty}
        onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
      />
      <h2>Doba vaření: {prepareTime}</h2>
      <input
        id="prepareTime-id"
        name="prepareTime"
        value={updatedRecipe.prepareTime}
        type="number"
        onChange={(e) => tmpUpdateRecipe(e.target.name, e.target.value)}
      />
      <h2>Suroviny</h2>
      <ul>
        {ingredients.map((ingredient, index) => {
          return <input key={index} value={ingredient} />;
        })}
      </ul>
      <div>
        <input
          placeholder="New ingredient"
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <Button variant="primary" onClick={updateIngredientList}>
          Add Ingredient
        </Button>
      </div>
      <Button variant="success" onClick={() => updateRecipe()}>
        Uložit
      </Button>
      <Button variant="danger" onClick={validateUpdate}>
        Zpět
      </Button>
    </div>
  );
};

export default RecipeEdit;

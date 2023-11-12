import { useState } from "react";
import { Link } from "react-router-dom";

import { IRecipe } from "../../interfaces/Recipe";

import Button from "react-bootstrap/Button";

interface Props {
  id: string | undefined,
  recipeData: IRecipe
}

const RecipeDetail: React.FC<Props> = (props) => {
  const {id} = props;
  const {title, book, mealType, difficulty, prepareTime, cookedNumber, ingredients} = props.recipeData;
  const [cookingNumber, setCookedNumber] = useState<number>(cookedNumber);
  return (
    <div>
      <h1>Editace receptu - {id}</h1>
      <h2>Název: {title}</h2>
      <h2>Obrázek</h2>
      <h2>Kniha: {book}</h2>
      <h2>Typ: {mealType}</h2>
      <h2>Náročnost: {difficulty}</h2>
      <h2>Doba vaření: {prepareTime}</h2>
      <h2>Suroviny</h2>
      <h2>Počet vaření - {cookingNumber}</h2>
      <h2>Ingredience: </h2>
      <ul>
        {ingredients.map((ingredient) => {
          return <li key={ingredient}>{ingredient}</li>
        })}
      </ul>
      <Button variant="primary">Upravit</Button>
      <Button
        variant="success"
        onClick={() => setCookedNumber(cookingNumber + 1)}
      >
        Počet vaření +1
      </Button>
      <Link to="/recipelist"><Button>Zpět</Button></Link>
    </div>
  );
};

export default RecipeDetail;

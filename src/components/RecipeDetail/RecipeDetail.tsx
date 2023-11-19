import { Link } from "react-router-dom";

import { IRecipe } from "../../interfaces/Recipe";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./style.css";

import image from "../../tmpImgs/food3.jpg";

interface Props {
  id: string | undefined;
  recipeData: IRecipe;
  startEdit: () => void;
  increaseCookedNumber: () => void;
}

const RecipeDetail: React.FC<Props> = (props) => {
  const {
    book,
    mealType,
    difficulty,
    prepareTime,
    cookedNumber,
    ingredients,
    page,
  } = props.recipeData;

  return (
    <div className="recipeDetail-container">
      <section className="recipeDetail-buttons">
        <Button variant="primary" onClick={props.startEdit}>
          Upravit
        </Button>
        <Button variant="success" onClick={props.increaseCookedNumber}>
          Připraveno +1
        </Button>
        <Link to="/recipelist">
          <Button>Zpět</Button>
        </Link>
      </section>
      <h2>Kniha: {book}</h2>
      <h2>Strana: {page}</h2>
      <h2>Typ: {mealType}</h2>
      <h2>Náročnost: {difficulty}</h2>
      <h2>Doba přípravy: {prepareTime} minut</h2>
      <h2>Připraveno: {cookedNumber}x</h2>
      <h2>Ingredience: </h2>
      <ul>
        {ingredients.map((ingredient) => {
          return <li key={ingredient}>{ingredient}</li>;
        })}
      </ul>
      <Image src={image} thumbnail/>
    </div>
  );
};

export default RecipeDetail;

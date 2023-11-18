import { Link } from "react-router-dom";

import { IRecipe } from "../../interfaces/Recipe";

import Button from "react-bootstrap/Button";

interface Props {
  id: string | undefined;
  recipeData: IRecipe;
  startEdit: () => void;
  increaseCookedNumber: () => void;
}

const RecipeDetail: React.FC<Props> = (props) => {
  const { id } = props;
  const {
    title,
    book,
    mealType,
    difficulty,
    prepareTime,
    cookedNumber,
    ingredients,
    page,
  } = props.recipeData;

  return (
    <div>
      <h1>Detail receptu - {id}</h1>
      <h2>Název: {title}</h2>
      <h2>Obrázek</h2>
      <h2>Kniha: {book}</h2>
      <h2>Strana: {page}</h2>
      <h2>Typ: {mealType}</h2>
      <h2>Náročnost: {difficulty}</h2>
      <h2>Doba vaření: {prepareTime}</h2>
      <h2>Suroviny</h2>
      <h2>Počet vaření - {cookedNumber}</h2>
      <h2>Ingredience: </h2>
      <ul>
        {ingredients.map((ingredient) => {
          return <li key={ingredient}>{ingredient}</li>;
        })}
      </ul>
      <Button variant="primary" onClick={props.startEdit}>
        Upravit
      </Button>
      <Button
        variant="success"
        onClick={props.increaseCookedNumber}
      >
        Počet vaření +1
      </Button>
      <Link to="/recipelist">
        <Button>Zpět</Button>
      </Link>
    </div>
  );
};

export default RecipeDetail;

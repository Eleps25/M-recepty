import { useState } from "react";
import { Link } from "react-router-dom";

import {IRecipeList} from "../../interfaces/RecipeList";

import Button from "react-bootstrap/Button";

interface Props {
  recipeData: IRecipeList
}

const Recipe: React.FC<Props> = (props) => {
  const {title, book, mealType, difficulty, prepareTime, cookedNumber, id} = props.recipeData;
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  return (
    <div>
      <h1>Název receptu: {title}</h1>
      <h2>Obrázek</h2>
      <h2>Název knihy: {book}</h2>
      <h2>Typ: {mealType}</h2>
      <h2>Počet vaření: {cookedNumber}</h2>
      <h2>Náročnost: {difficulty}</h2>
      <h2>Doba přípravy: {prepareTime}</h2>
      <h2>
        Oblíbené:{" "}
        <input
          type="checkbox"
          checked={isFavourite}
          onChange={() => setIsFavourite(!isFavourite)}
        />
      </h2>
      <Link to={`/recipelist/${id}`}><Button>Detail</Button></Link>
    </div>
  );
};

export default Recipe;

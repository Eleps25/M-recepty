import { Link } from "react-router-dom";

import { IRecipeList } from "../../interfaces/RecipeList";
import image from "../../tmpImgs/food2.jpg";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";

interface Props {
  recipeData: IRecipeList;
  deleteRecipe: () => void;
  updateRecipeFavourite: () => void;
}

const Recipe: React.FC<Props> = (props) => {
  const {
    title,
    book,
    mealType,
    difficulty,
    prepareTime,
    cookedNumber,
    id,
    isFavourite,
    page,
  } = props.recipeData;
  return (
    <Card className="text-center" bg={isFavourite ? "warning" : null}>
      <Card.Img src={image} />
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Název knihy: {book}</Card.Text>
        <Card.Text>Strana: {page}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>Typ: {mealType}</Card.Text>
        <Card.Text>Počet vaření: {cookedNumber}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>Náročnost: {difficulty}</Card.Text>
        <Card.Text>Doba přípravy: {prepareTime} minut</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>
          Oblíbené:{" "}
          <input
            type="checkbox"
            checked={isFavourite}
            onChange={props.updateRecipeFavourite}
          />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="cardFooter-buttons">
          <Link to={`/recipelist/${id}`}>
            <Button>Detail</Button>
          </Link>
          <Button onClick={props.deleteRecipe} variant="danger">
            Smazat
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Recipe;

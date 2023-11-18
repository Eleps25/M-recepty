import { Link } from "react-router-dom";

import { IRecipeList } from "../../interfaces/RecipeList";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import image from "../../tmpImgs/food1.jpg";

interface Props {
  recipeData: IRecipeList;
}

const HomeRecipe: React.FC<Props> = (props) => {
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
    <Card
      className="myCard-container text-center"
      bg={isFavourite ? "warning" : null}
    >
      <Card.Img src={image} variant="bottom" />
      {
        <Card.Header>
          <Card.Title>{title}</Card.Title>
        </Card.Header>
      }
      <Card.Body>
        <Card.Text>Strana: {page}</Card.Text>{" "}
        <Card.Text>Kniha: {book}</Card.Text>
        <Card.Body>
          <Card.Text>Počet vaření: {cookedNumber}</Card.Text>
          <Card.Text>Náročnost: {difficulty}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Text>Typ: {mealType}</Card.Text>
          Doba přípravy: {prepareTime} minut
        </Card.Body>
        <Card.Text>
          Oblíbené: <input type="checkbox" checked={isFavourite} disabled />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`/recipelist/${id}`}>
          <Button>Detail</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default HomeRecipe;

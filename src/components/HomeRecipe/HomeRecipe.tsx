import { Link } from "react-router-dom";

import { IRecipeList } from "../../interfaces/RecipeList";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";

interface Props {
  recipeData: IRecipeList;
  imgSrc: string;
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
      <Card.Img src={props.imgSrc} variant="top" className="recipe-image" />
      {
        <Card.Header>
          <Card.Title>
            {title}{" "}
            <label htmlFor={id}>
              {isFavourite ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/14/Font_Awesome_5_solid_star.svg"
                  width="20"
                  height="20"
                />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Star_empty_font_awesome.svg"
                  width="20"
                  height="20"
                />
              )}
            </label>
            <input
              id={id}
              type="checkbox"
              checked={isFavourite}
              className="homeRecipe-favourite"
            />
          </Card.Title>
        </Card.Header>
      }
      <Card.Body>
        <Card.Text>Kniha: {book}</Card.Text>
        <Card.Text>Strana: {page}</Card.Text>
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

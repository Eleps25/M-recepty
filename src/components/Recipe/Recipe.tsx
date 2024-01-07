import { Link } from "react-router-dom";

import { IRecipeList } from "../../interfaces/RecipeList";
/* import image from "../../tmpImgs/food2.jpg"; */

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";

interface Props {
  recipeData: IRecipeList;
  deleteRecipe: () => void;
  updateRecipeFavourite: () => void;
  updateSlowCooker: () => void;
  imgSrc: string;
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
    slowCooker
  } = props.recipeData;

  return (
    <Card
      className="text-center myRecipeCard-container"
      bg={isFavourite ? "warning" : null}
    >
      <Card.Img src={props.imgSrc} variant="top" className="card-image" />
      <Card.Header>
        <Card.Title className="myRecipeCard-title">
          {title}
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
            onChange={props.updateRecipeFavourite}
            className="myRecipeCard-favourite"
          />
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Náročnost: {difficulty}</Card.Text>
        <Card.Text>Doba přípravy: {prepareTime} minut</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>Typ: {mealType}</Card.Text>
        <Card.Text>Počet vaření: {cookedNumber}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>Název knihy: {book}</Card.Text>
        <Card.Text>Strana: {page}</Card.Text>
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
        <Card.Text>
        Pomalý hrnec:{" "}
          <input
            type="checkbox"
            checked={slowCooker}
            onChange={props.updateSlowCooker}
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

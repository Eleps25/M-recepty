import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { IRecipe } from "../../interfaces/Recipe";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";

import image from "../../tmpImgs/food3.jpg";

interface Props {
  id: string | undefined;
  recipeData: IRecipe;
  startEdit: () => void;
  increaseCookedNumber: () => void;
}

const RecipeDetail: React.FC<Props> = (props) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const {
    book,
    mealType,
    difficulty,
    prepareTime,
    cookedNumber,
    ingredients,
    page,
  } = props.recipeData;

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return function () {
      window.removeEventListener("resize", handleResize);
    };
  });

  const showSmall = () => {
    return (
      <section className="recipeDetail-small">
        <h2>
          Umístění: {book} - str. {page}
        </h2>
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
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Image src={image} fluid />
            </Col>
          </Row>
        </Container>
      </section>
    );
  };

  const showBig = () => {
    return (
      <section className="recipeDetail-big-container">
        <div className="recipeDetail-big-info">
          <div className="recipeDetail-big-informations">
            <h2>
              Umístění: {book} - str. {page}
            </h2>
            <h3>Typ: {mealType}</h3>
            <h3>Náročnost: {difficulty}</h3>
            <h3>Doba přípravy: {prepareTime} minut</h3>
            <h3>Připraveno: {cookedNumber}x</h3>
          </div>
          <Image src={image} className="recipeDetail-big-image" />
        </div>
        <div className="recipeDetail-big-ingredients-container">
          <h2>Ingredience: </h2>
          <ul>
            {ingredients.map((ingredient) => {
              return <li key={ingredient}>{ingredient}</li>;
            })}
          </ul>
        </div>
      </section>
    );
  };

  const showBigAll = () => {
    return (
      <section className="recipeDetail-big-all-container">
        <div className="recipeDetail-big-all-info">
          <div className="recipeDetail-big-all-informations">
            <h2>
              Umístění: {book} - str. {page}
            </h2>
            <h3>Typ: {mealType}</h3>
            <h3>Náročnost: {difficulty}</h3>
            <h3>Doba přípravy: {prepareTime} minut</h3>
            <h3>Připraveno: {cookedNumber}x</h3>
          </div>
          <div className="recipeDetail-big-all-ingredients-container">
            <h2>Ingredience: </h2>
            <ul>
              {ingredients.map((ingredient) => {
                return <li key={ingredient}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <Image src={image} className="recipeDetail-big-all-image" />
        </div>
      </section>
    );
  };

  return (
    <div className="recipeDetail-container">
      {windowWidth > 992 ? showBigAll() : showSmall()}
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
    </div>
  );
};

export default RecipeDetail;

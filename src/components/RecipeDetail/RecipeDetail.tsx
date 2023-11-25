import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

import passwordCheck from "../../HelperFunctions/passwordCheck.js";

import { IRecipe } from "../../interfaces/Recipe";

import RecipeDetailIngredient from "../RecipeDetailIngredient/RecipeDetailIngredient";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";

interface Props {
  id: string | undefined;
  recipeData: IRecipe;
  startEdit: () => void;
  increaseCookedNumber: () => void;
  imageSrc: string;
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

  const basketCollectionRef = collection(db, "basket");

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return function () {
      window.removeEventListener("resize", handleResize);
    };
  });

  const addIngredient = async (name: string) => {
    if (!passwordCheck()) {
      return;
    }

    try {
      console.log("Added ", name)
      await addDoc(basketCollectionRef, {
          name: name
      });
    } catch (err) {
      throw new Error(err);
    }
  };

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
            return (
              <RecipeDetailIngredient
                ingredientName={ingredient}
                key={ingredient}
                addIngredient={(() => addIngredient(ingredient))}
              />
            );
          })}
        </ul>
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Image src={props.imageSrc} fluid />
            </Col>
          </Row>
        </Container>
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
                return (
                  <RecipeDetailIngredient
                    ingredientName={ingredient}
                    key={ingredient}
                    addIngredient={(() => addIngredient(ingredient))}
                  />
                );
              })}
            </ul>
          </div>
          <Image src={props.imageSrc} className="recipeDetail-big-all-image" />
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

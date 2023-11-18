import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

/* import HomeInfo from "../HomeInfo/HomeInfo";
 */ import HomeMostPrepared from "../HomeMostPrepared/HomeMostPrepared";
import HomeRandomRecipe from "../HomeRandomRecipe/HomeRandomRecipe";

import { IRecipeList } from "../../interfaces/RecipeList";

import Spinner from "react-bootstrap/Spinner";
import "./style.css";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipeList[]>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const recipesCollectionRef = collection(db, "recipes");

  const getRecipeList = async () => {
    try {
      const data = await getDocs(recipesCollectionRef);
      const filteredData: any = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipes(filteredData);
      setIsLoad(true);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  return (
    <div>
      <h1>Domovská stránka</h1>
      {/*       <HomeInfo />
       */}
      <section className="home-recipes">
        {isLoad ? (
          <div className="home-mostPrepared">
            <HomeMostPrepared listData={recipes} />
          </div>
        ) : (
          <div className="home-spinner">
            <Spinner animation="border" />
          </div>
        )}
        {isLoad ? (
          <div className="home-randomRecipe">
            <HomeRandomRecipe listData={recipes} />
          </div>
        ) : (
          <div className="home-spinner">
            <Spinner animation="border" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

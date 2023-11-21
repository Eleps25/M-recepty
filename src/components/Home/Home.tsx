import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import { storage } from "../../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import HomeMostPrepared from "../HomeMostPrepared/HomeMostPrepared";
import HomeRandomRecipe from "../HomeRandomRecipe/HomeRandomRecipe";

import { IRecipeList } from "../../interfaces/RecipeList";

import Spinner from "react-bootstrap/Spinner";
import "./style.css";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipeList[]>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [imageList, setImageList] = useState([]);
  const [imagesIsLoad, setImagesIsLoad] = useState(false);

  const recipesCollectionRef = collection(db, "recipes");
  const imageListRef = ref(storage, "recipes/");

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

  const getImageList = () => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          setImagesIsLoad(true);
        });
      });
    });
  };

  useEffect(() => {
    getRecipeList();
    getImageList();
  }, []);

  return (
    <div className="home-container">
      <h1>Domovská stránka</h1>
      <section className="home-recipes">
        {isLoad && imagesIsLoad ? (
          <div className="home-mostPrepared">
            <HomeMostPrepared listData={recipes} imageListSrc={imageList} />
          </div>
        ) : (
          <div className="home-spinner">
            <Spinner animation="border" />
          </div>
        )}
        {isLoad && imagesIsLoad ? (
          <div className="home-randomRecipe">
            <HomeRandomRecipe listData={recipes} imageListSrc={imageList} />
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

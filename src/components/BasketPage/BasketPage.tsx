import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import BasketList from "../BasketList/BasketList";

import { IBasketItem } from "../../interfaces/BasketItem";

const BasketPage: React.FC = () => {
  const [basketList, setBasketList] = useState<IBasketItem[]>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const basketCollectionRef = collection(db, "basket");

  const getBasketList = async () => {
    try {
      const data = await getDocs(basketCollectionRef);
      const filteredData: any = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBasketList(filteredData);
      setIsLoad(true);
      console.log(basketList)
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getBasketList();
    console.log(basketList)
  }, []);

  return (
    <div>
        <h1>Basket Page</h1>
        
        {isLoad ? <BasketList basketItems={basketList}/> : "Loading"}
    </div>
  );
};

export default BasketPage;

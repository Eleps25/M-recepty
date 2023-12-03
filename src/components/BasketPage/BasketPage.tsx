import { useState, useEffect } from "react";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../config/firebase";

import passwordCheck from "../../HelperFunctions/passwordCheck.js";

import BasketList from "../BasketList/BasketList";

import { IBasketItem } from "../../interfaces/BasketItem";
import "./style.css";

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
      console.log(basketList);
    } catch (err) {
      throw new Error(err);
    }
  };

  const deleteBasketItem = async (id: string) => {
    if (!passwordCheck()) {
      return;
    }

    const basketItemDoc = doc(db, "basket", id);
    try {
      console.log("Deleted item: ", id);
      await deleteDoc(basketItemDoc);

      getBasketList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBasket = async () => {
    if (!passwordCheck()) {
      return;
    }

    const batch = writeBatch(db);

    basketList.forEach((item) => {
      let itemRef = doc(db, "basket", `${item.id}`);
      batch.delete(itemRef);
    });

    await batch.commit();
    getBasketList();
  };

  const postCurrentBasket = async (basketList: IBasketItem[]) => {
    if (!passwordCheck()) {
      return;
    }

    const batch = writeBatch(db);

    basketList.forEach((item) => {
      let itemRef = doc(db, "basket", `${item.id}`);
      batch.delete(itemRef);
    });

    await batch.commit();
    getBasketList();
  };

  const handleShowList = () => {
    if (isLoad) {
      if (basketList.length === 0) {
        return "Vše nakoupeno";
      }
      return (
        <BasketList
          basketItems={basketList}
          deleteItem={deleteBasketItem}
          deleteBasket={deleteBasket}
          postCurrentBasket={postCurrentBasket}
        />
      );
    }
    return "Loading";
  };

  useEffect(() => {
    getBasketList();
    console.log("rerender");
  }, []);

  return (
    <div className="basketPage-container">
      <h2 className="basketPage-header">Co nakoupit?</h2>
      {handleShowList()}
    </div>
  );
};

export default BasketPage;

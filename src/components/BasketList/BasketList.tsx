import { useState } from "react";

import { IBasketItem } from "../../interfaces/BasketItem";

import BasketItem from "../BasketItem/BasketItem";
import Button from "react-bootstrap/Button";

interface Props {
  basketItems: IBasketItem[];
  deleteItem: (id: string) => Promise<void>;
  postCurrentBasket: (item: any) => any;
}

const BasketList: React.FC<Props> = (props) => {
  const [activeBasket, setActiveBasket] = useState<IBasketItem[]>([]);

  const handleUpdateItem = (item: IBasketItem) => {
    if(activeBasket.some((basketItem) => basketItem.id === item.id)){
      const newBasket = activeBasket.filter((basketItem) => basketItem.id !== item.id);
      setActiveBasket(newBasket)
    } else {
      console.log("not contain");
      setActiveBasket([...activeBasket, item])
    }
  }

  const checkItemInBasket = (itemId: string) => {
    const inBasket = activeBasket.map((item) => {
      if (item.id === itemId) {
        return true;
      }
      return false;
    });
    return inBasket.includes(true);
  };

  return (
    <div>
      <div>
        <h2>Co koupit?</h2>
        {props.basketItems.map((item) => {
          const isInBasket = checkItemInBasket(item.id);
          return (
            <BasketItem
              key={item.id}
              id={item.id}
              name={item.name}
              deleteItem={() => props.deleteItem(item.id)}
              inBasket={isInBasket}
              updateCurrBasket={() =>
                handleUpdateItem(item)
              }
            />
          );
        })}
        <Button onClick={() => props.postCurrentBasket(activeBasket)}>Košík nakoupen</Button>
      </div>
    </div>
  );
};

export default BasketList;

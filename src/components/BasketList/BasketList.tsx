import { useState } from "react";

import { IBasketItem } from "../../interfaces/BasketItem";

import BasketItem from "../BasketItem/BasketItem";

interface Props {
  basketItems: IBasketItem[];
}

const BasketList: React.FC<Props> = (props) => {
  const [basketItems, setBasketItems] = useState<IBasketItem[]>(
    props.basketItems
  );

  return (
    <div>
      <h2>Basket List</h2>
      {basketItems.map((item) => {
        return <BasketItem id={item.id} name={item.name} />;
      })}
    </div>
  );
};

export default BasketList;

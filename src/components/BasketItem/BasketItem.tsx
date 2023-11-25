import { IBasketItem } from "../../interfaces/BasketItem";

const BasketItem: React.FC<IBasketItem> = (props) => {
    const {name, id} = props;
    return (
        <div>
            <h2>Basket Item</h2>
            <p>name: {name}</p>
            <p>id: {id}</p>
        </div>
    )
};

export default BasketItem;
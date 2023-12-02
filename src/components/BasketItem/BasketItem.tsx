import Button from "react-bootstrap/Button";
import "./style.css";

interface Props {
    name: string;
    id: string;
    inBasket: boolean;
    deleteItem: (id: any) => Promise<void>;
    updateCurrBasket: (item: any) => void;
}

const BasketItem: React.FC<Props> = (props) => {
    const {name, inBasket} = props;
    return (
        <div className={inBasket ? "item-inBasket" : "item-notInBasket"}>
            <li>{name}</li>
            <Button variant="success" onClick={props.deleteItem}>Koupeno</Button>
            <Button onClick={props.updateCurrBasket}>{inBasket ? "V košíku" : "Do košíku"}</Button>
        </div>
    )
};

export default BasketItem;
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
  const { name, inBasket } = props;
  return (
    <div
      className={
        inBasket
          ? "item-inBasket basketItem-container"
          : "item-notInBasket basketItem-container"
      }
    >
      <li className="basketItem-item">{name}</li>
      <div className="basketItem-buttons">
        <Button variant="success" onClick={props.deleteItem} className="basketItem-button">
          Koupeno
        </Button>
        <Button onClick={props.updateCurrBasket} className="basketItem-button">
          {inBasket ? "V košíku" : "Do košíku"}
        </Button>
      </div>
    </div>
  );
};

export default BasketItem;

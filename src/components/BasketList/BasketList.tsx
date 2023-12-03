import { useState } from "react";

import BasketItem from "../BasketItem/BasketItem";
import BasketAddItemForm from "../BasketAddItemForm/BasketAddItemForm";

import { IBasketItem } from "../../interfaces/BasketItem";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";

interface Props {
  basketItems: IBasketItem[];
  deleteItem: (id: string) => Promise<void>;
  deleteBasket: () => Promise<void>;
  postCurrentBasket: (item: any) => any;
  getBasketList: () => Promise<void>;
}

const BasketList: React.FC<Props> = (props) => {
  const [activeBasket, setActiveBasket] = useState<IBasketItem[]>([]);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [showAddedModal, setShowAddedModal] = useState<boolean>(false);

  const handleUpdateItem = (item: IBasketItem) => {
    if (activeBasket.some((basketItem) => basketItem.id === item.id)) {
      const newBasket = activeBasket.filter(
        (basketItem) => basketItem.id !== item.id
      );
      setActiveBasket(newBasket);
    } else {
      console.log("not contain");
      setActiveBasket([...activeBasket, item]);
    }
  };

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
    <div className="BasketList-container">
      <div className="BasketList-items">
        {props.basketItems.map((item) => {
          const isInBasket = checkItemInBasket(item.id);
          return (
            <BasketItem
              key={item.id}
              id={item.id}
              name={item.name}
              deleteItem={() => props.deleteItem(item.id)}
              inBasket={isInBasket}
              updateCurrBasket={() => handleUpdateItem(item)}
            />
          );
        })}
      </div>
      <div className="BasketList-buttons">
        <Button onClick={props.deleteBasket} variant="success" className="me-2">
          Vše nakoupeno
        </Button>
        <Button onClick={() => props.postCurrentBasket(activeBasket)}>
          Košík nakoupen
        </Button>
      </div>
      {isAdding ? null : (
        <Button
          onClick={() => setIsAdding(true)}
          className="BasketList-addButton"
        >
          Přidat recept
        </Button>
      )}
      <Modal
        show={isAdding}
        onHide={() => setIsAdding(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-add">
          <Modal.Title>Přidat novou položku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BasketAddItemForm toggleAdd={setIsAdding} getList={props.getBasketList} setShowAddedModal={setShowAddedModal} />
        </Modal.Body>
      </Modal>

      <Modal
          show={showAddedModal}
          onHide={() => setShowAddedModal(false)}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="modal-add">
            <Modal.Title>Úspěch</Modal.Title>
          </Modal.Header>
          <Modal.Body>Položka úspěšně uložena</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setShowAddedModal(false)}>
              Rozumím
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default BasketList;

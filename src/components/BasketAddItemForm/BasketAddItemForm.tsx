import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

import passwordCheck from "../../HelperFunctions/passwordCheck.js";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface Props {
  toggleAdd: (arg: boolean) => void;
  getList: () => void;
  setShowAddedModal: (value: React.SetStateAction<boolean>) => void;
}

const BasketAddItemForm: React.FC<Props> = (props) => {
  const { getList } = props;

  const [newBasketItem, setNewBasketItem] = useState<string>("");

  const recipesCollectionRef = collection(db, "basket");

  const addRecipe = async (e) => {
    e.preventDefault();
    if (!passwordCheck()) {
      return;
    }

    try {
      await addDoc(recipesCollectionRef, {
        name: newBasketItem
      });
      props.toggleAdd(false);
      getList();
      props.setShowAddedModal(true);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div>
      <Form onSubmit={addRecipe}>
        <Form.Group>
          <Form.Label htmlFor="title">Název:</Form.Label>
          <Form.Control
            id="title"
            name="title"
            type="text"
            required
            onChange={(e) => setNewBasketItem(e.target.value)}
          />
        </Form.Group>

        <section className="addRecipeForm-buttons">
          <Button
            variant="success"
            type="submit"
            className="addRecipeForm-button"
          >
            Přidat
          </Button>
          <Button
            variant="danger"
            onClick={() => props.toggleAdd(false)}
            className="addRecipeForm-button"
          >
            Zpět
          </Button>
        </section>
      </Form>
    </div>
  );
};

export default BasketAddItemForm;

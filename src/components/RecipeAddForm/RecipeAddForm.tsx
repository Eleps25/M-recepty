import Button from "react-bootstrap/Button";

interface Props {
  toggleAdd: (arg: boolean) => void
}

const RecipeAddForm: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>Fromulář přidání nového receptu</h1>
      <h2>Název</h2>
      <h2>Kniha</h2>
      <h2>Stránka</h2>
      <h2>Typ</h2>
      <h2>Náročnost</h2>
      <h2>Doba vaření</h2>
      <h2>Suroviny</h2>
      <Button variant="success">Přidat</Button>
      <Button variant="danger" onClick={() => props.toggleAdd(false)}>Zpět</Button>
    </div>
  );
};

export default RecipeAddForm;

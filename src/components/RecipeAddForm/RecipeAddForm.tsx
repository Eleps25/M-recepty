import Button from "react-bootstrap/Button";

const RecipeAddForm: React.FC = () => {
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
    </div>
  );
};

export default RecipeAddForm;

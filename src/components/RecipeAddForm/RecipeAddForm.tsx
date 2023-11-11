import Button from "react-bootstrap/Button";

export default function RecipeAddForm() {
  return(
    <div>
      <h1>Fromulář přidání nového receptu</h1>
      <h2>Název</h2>
      <h2>Kniha</h2>
      <h2>Typ</h2>
      <h2>Náročnost</h2>
      <h2>Doba vaření</h2>
      <Button variant="success">Přidat</Button>
    </div>
  ) 
}

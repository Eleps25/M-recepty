import Button from "react-bootstrap/Button"

export default function RecipeEdit() {
  return (
    <div>
      <h1>Editace receptu</h1>
      <h2>Název</h2>
      <h2>Kniha</h2>
      <h2>Typ</h2>
      <h2>Náročnost</h2>
      <h2>Doba vaření</h2>
      <h2>Suroviny</h2>
      <Button variant="success">Uložit</Button>
      <Button variant="danger">Zpět</Button>
    </div>
  );
}

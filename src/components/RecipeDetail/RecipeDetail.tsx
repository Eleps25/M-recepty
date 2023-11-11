import { useState } from "react";

import Button from "react-bootstrap/Button";

export default function RecipeDetail() {
  const [cookedNumber, setCookedNumber] = useState(0);
  return (
    <div>
      <h1>Editace receptu</h1>
      <h2>Název</h2>
      <h2>Obrázek</h2>
      <h2>Kniha</h2>
      <h2>Typ</h2>
      <h2>Náročnost</h2>
      <h2>Doba vaření</h2>
      <h2>Suroviny</h2>
      <h2>Počet vaření - {cookedNumber}</h2>
      <Button variant="primary">Upravit</Button>
      <Button
        variant="success"
        onClick={() => setCookedNumber(cookedNumber + 1)}
      >
        Počet vaření +1
      </Button>
    </div>
  );
}

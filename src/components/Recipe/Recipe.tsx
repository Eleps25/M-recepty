import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

const Recipe: React.FC = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  return (
    <div>
      <h1>Název receptu</h1>
      <h2>Obrázek</h2>
      <h2>Název knihy</h2>
      <h2>Typ</h2>
      <h2>Počet vaření</h2>
      <h2>Náročnost</h2>
      <h2>Doba přípravy</h2>
      <h2>
        Oblíbené:{" "}
        <input
          type="checkbox"
          checked={isFavourite}
          onChange={() => setIsFavourite(!isFavourite)}
        />
      </h2>
      <Link to="/recipelist/1"><Button>Detail</Button></Link>
    </div>
  );
};

export default Recipe;

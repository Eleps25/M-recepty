import Button from "react-bootstrap/Button";
import "./style.css";

interface Props {
    ingredientName: string;
    addIngredient: (name: any) => Promise<void>;
}

const RecipeDetailIngredient: React.FC<Props> = (props) => {
    return(
        <div className="ingredient-container">
            <div>{props.ingredientName}</div>
            <Button onClick={props.addIngredient}>Do košíku</Button>
        </div>
    )
};

export default RecipeDetailIngredient;
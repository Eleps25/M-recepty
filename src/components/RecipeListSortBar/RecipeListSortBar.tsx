import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { IRecipeList } from "../../interfaces/RecipeList";

interface Props {
  sortItems: (
    recipe: IRecipeList[],
    columnToSort: string,
    setRecipes: React.Dispatch<React.SetStateAction<IRecipeList[]>>,
    isSorted: boolean,
    setIsSorted: React.Dispatch<React.SetStateAction<boolean>>,
    isAscSorted: boolean,
    setIsAscSorted: React.Dispatch<React.SetStateAction<boolean>>,
    sortedCol: string,
    setSortedCol: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  recipes: IRecipeList[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipeList[]>>;
  isSorted: boolean;
  setIsSorted: React.Dispatch<React.SetStateAction<boolean>>;
  isAscSorted: boolean;
  setIsAscSorted: React.Dispatch<React.SetStateAction<boolean>>;
  sortedCol: string;
  setSortedCol: React.Dispatch<React.SetStateAction<string>>;
}

const RecipeListSortBar: React.FC<Props> = (props) => {
  const {
    sortItems,
    recipes,
    setRecipes,
    isSorted,
    setIsSorted,
    isAscSorted,
    setIsAscSorted,
    sortedCol,
    setSortedCol,
  } = props;
  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "difficulty",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Náročnost
        </Button>
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "prepareTime",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Doba přípravy
        </Button>
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "mealType",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Typ
        </Button>
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "cookedNumber",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Počet příprav
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "isFavourite",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Oblíbenost
        </Button>
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "title",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Název
        </Button>
        <Button
          onClick={() =>
            sortItems(
              recipes,
              "book",
              setRecipes,
              isSorted,
              setIsSorted,
              isAscSorted,
              setIsAscSorted,
              sortedCol,
              setSortedCol
            )
          }
        >
          Kniha
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default RecipeListSortBar;

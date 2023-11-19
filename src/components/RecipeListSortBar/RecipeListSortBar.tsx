import Button from "react-bootstrap/Button";

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
        Seřadit podle názvu
      </Button>
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
        Seřadit podle náročnosti
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
        Seřadit podle doby přípravy
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
        Seřadit podle typu
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
        Seřadit podle počtu příprav
      </Button>
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
        Seřadit podle oblíbenosti
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
        Seřadit podle knihy
      </Button>
    </div>
  );
};

export default RecipeListSortBar;

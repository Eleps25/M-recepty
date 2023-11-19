const sortAsc = (columnToSort, recipes) => {
  const sortedRecipes = recipes.toSorted((firstRecipe, secondRecipe) => {
    const columnOne = typeof recipes[columnToSort] === "string" ? firstRecipe[columnToSort].toUpperCase() : firstRecipe[columnToSort];
    const columnTwo = typeof recipes[columnToSort] === "string" ? secondRecipe[columnToSort].toUpperCase(): secondRecipe[columnToSort];
    if (columnOne < columnTwo) {
      return -1;
    }
    if (columnOne > columnTwo) {
      return 1;
    }
    return 0;
  });
  return sortedRecipes;
};

const sortDesc = (columnToSort, recipes) => {
  const sortedRecipes = recipes.toSorted((firstRecipe, secondRecipe) => {
    const columnOne = typeof recipes[columnToSort] === "string" ? firstRecipe[columnToSort].toUpperCase() : firstRecipe[columnToSort];
    const columnTwo = typeof recipes[columnToSort] === "string" ? secondRecipe[columnToSort].toUpperCase(): secondRecipe[columnToSort];
    if (columnOne < columnTwo) {
      return 1;
    }
    if (columnOne > columnTwo) {
      return -1;
    }
    return 0;
  });
  return sortedRecipes;
};

const sortRecipes = (
  recipes,
  columnToSort,
  setRecipes,
  isSorted,
  setIsSorted,
  isAscSorted,
  setIsAscSorted,
  prevSortedCol,
  setSortedCol
) => {
  if (prevSortedCol === columnToSort) {
    if (!isSorted) {
      setRecipes(sortAsc(columnToSort, recipes));
      setIsSorted(true);
      setIsAscSorted(true);
    } else if (isSorted && isAscSorted) {
      setRecipes(sortDesc(columnToSort, recipes));
      setIsAscSorted(false);
    } else {
      setRecipes(sortAsc("id", recipes));
      setIsSorted(false);
    }
  } else {
    setSortedCol(columnToSort);
    setRecipes(sortAsc(columnToSort, recipes));
    setIsSorted(true);
    setIsAscSorted(true);
  }
};

export default sortRecipes;

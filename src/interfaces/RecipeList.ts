export interface IRecipeList {
    title: string,
    book: string,
    mealType: string,
    difficulty: string,
    prepareTime: number,
    cookedNumber: number,
    isFavourite: boolean,
    ingredients: string[],
    id: string
}
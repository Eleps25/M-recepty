export interface IRecipe {
    title: string,
    book: string,
    mealType: string,
    difficulty: string,
    prepareTime: number,
    cookedNumber: number,
    isFavourite: boolean,
    ingredients: string[]
}
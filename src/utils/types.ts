export type TBurgerConstructorItem = {
    item: TIngredient;
    uid: number;
    index: number;
};
export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};
export type TForm = {
    name?: string;
    email: string;
    password: string;
}
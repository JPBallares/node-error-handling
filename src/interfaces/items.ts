export interface IBaseItem {
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface IItem extends IBaseItem {
    id: number;
}

export interface IItems {
    [key: number]: IItem;
}
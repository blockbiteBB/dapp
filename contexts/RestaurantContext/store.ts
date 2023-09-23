import { Food } from "@/app/utils/types";

export interface Order extends Food {
    quantity: number;
}

export interface State {
    order: Order[];
}

export const initialState: State = {
    order: [],
};

import { Food } from "@/app/utils/types";
import { State } from "./store";

export type Action = { type: "ADD_OR_UPDATE_ITEM"; food: Food } | { type: "RESET_ORDER" };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_OR_UPDATE_ITEM":
            const existingOrderIndex = state.order.findIndex((item) => item.name === action.food.name);

            // If the item exists, update its quantity
            if (existingOrderIndex > -1) {
                const updatedOrder = {
                    ...state.order[existingOrderIndex],
                    quantity: state.order[existingOrderIndex].quantity + 1,
                };

                return {
                    ...state,
                    order: [...state.order.slice(0, existingOrderIndex), updatedOrder, ...state.order.slice(existingOrderIndex + 1)],
                };
            }

            // If the item doesn't exist, add it with a quantity of 1
            return {
                ...state,
                order: [...state.order, { ...action.food, quantity: 1 }],
            };

        case "RESET_ORDER":
            return {
                ...state,
                order: [],
            };

        // ... other action handlers
        default:
            return state;
    }
};

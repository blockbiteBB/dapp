import { State } from "./store";

export type UserAction =
    | { type: "UPDATE_ADDRESS"; address: State["userAddress"] }
    | { type: "UPDATE_USERPBK"; userPBK: State["userPBK"] }
    | { type: "UPDATE_USERPVK"; userPVK: State["userPVK"] }
    | { type: "UPDATE_USERWALLET"; userWallet: State["userWallet"] }
    | { type: "UPDATE_ISDELIVER"; isDeliver: State["isDeliver"] }
    | { type: "UPDATE_ORDERS"; orders: State["orders"] };

export const reducer = (state: State, action: UserAction): State => {
    switch (action.type) {
        case "UPDATE_ADDRESS":
            return { ...state, userAddress: action.address };

        case "UPDATE_USERPBK":
            return { ...state, userPBK: action.userPBK };

        case "UPDATE_USERPVK":
            return { ...state, userPVK: action.userPVK };

        case "UPDATE_USERWALLET":
            return { ...state, userWallet: action.userWallet };

        case "UPDATE_ISDELIVER":
            return { ...state, isDeliver: action.isDeliver };

        case "UPDATE_ORDERS":
            return { ...state, orders: action.orders };

        default:
            throw "Bad action type";
    }
};

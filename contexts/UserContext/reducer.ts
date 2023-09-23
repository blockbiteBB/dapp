import { State } from "./store";

export type UserAction =
    | { type: "UPDATE_ADDRESS"; address: State["userAddress"] }
    | { type: "UPDATE_USERPBK"; userPBK: State["userPBK"] }
    | { type: "UPDATE_USERPVK"; userPVK: State["userPVK"] }
    | { type: "UPDATE_USERWALLET"; userWallet: State["userWallet"] };

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

        default:
            throw "Bad action type";
    }
};

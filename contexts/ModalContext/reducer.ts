import { State } from "./store";

export type Action = { type: "OPEN_MOBILE_MODAL" } | { type: "CLOSE_MOBILE_MODAL" } | { type: "UPDATE_CONTENT"; content: State["content"] };
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "OPEN_MOBILE_MODAL":
            return { ...state, mobileModalOpen: true };

        case "CLOSE_MOBILE_MODAL":
            return { ...state, mobileModalOpen: false };

        case "UPDATE_CONTENT":
            return { ...state, content: action.content };

        default:
            throw "Bad action type";
    }
};

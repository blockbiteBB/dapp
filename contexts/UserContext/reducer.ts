import { State } from "./store";

export type Action =
    | { type: "SET_MEMBERSHIPID"; membershipId: string | null }
    | { type: "SET_WHITELISTED"; isWhitelisted: boolean | null }
    | { type: "SET_APPLIED"; didApply: boolean | null }
    | { type: "SET_NFTS"; nfts: any };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_MEMBERSHIPID":
            return {
                ...state,
                membershipId: action.membershipId,
            };

        case "SET_WHITELISTED":
            return {
                ...state,
                isWhitelisted: action.isWhitelisted,
            };

        case "SET_APPLIED":
            return {
                ...state,
                didApply: action.didApply,
            };

        default:
            throw "Bad action type";
    }
};

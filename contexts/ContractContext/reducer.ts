import { State } from "./store";

export type Action =
    | { type: "UPDATE_LENS"; lens: State["lens"] }
    | { type: "UPDATE_MULTICHAIN_VERIFIER"; multiChainVerifier: State["multiChainVerifier"] };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "UPDATE_LENS":
            return {
                ...state,
                lens: action.lens,
            };
        case "UPDATE_MULTICHAIN_VERIFIER":
            return {
                ...state,
                multiChainVerifier: action.multiChainVerifier,
            };

        default:
            throw "Bad action type";
    }
};

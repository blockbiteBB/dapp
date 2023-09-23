import { State } from "./store";

export type Action = { type: "UPDATE_LENS"; lens: State["lens"] } | { type: "UPDATE_CONTRACT"; contract: State["contract"] };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "UPDATE_LENS":
            return {
                ...state,
                lens: action.lens,
            };
        case "UPDATE_CONTRACT":
            return {
                ...state,
                contract: action.contract,
            };

        default:
            throw "Bad action type";
    }
};

import { State } from "./store";

export type Action =
    | { type: "UPDATE_LENS"; lens: State["lens"] }
    | { type: "UPDATE_CONTRACT"; contract: State["contract"] }
    | { type: "UPDATE_GOVTOKEN"; govToken: State["govToken"] }
    | { type: "UPDATE_ERC20TOKEN"; erc20Token: State["erc20Token"] };

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

        case "UPDATE_GOVTOKEN":
            return {
                ...state,
                govToken: action.govToken,
            };

        case "UPDATE_ERC20TOKEN":
            return {
                ...state,
                erc20Token: action.erc20Token,
            };

        default:
            throw "Bad action type";
    }
};

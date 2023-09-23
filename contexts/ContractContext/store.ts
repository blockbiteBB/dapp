export interface State {
    contract: any;
    lens: any;
    govToken: any;
    erc20Token: any;
}

export const initialState: State = {
    contract: undefined,
    lens: undefined,
    govToken: undefined,
    erc20Token: undefined,
};

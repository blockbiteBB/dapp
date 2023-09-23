import { Wallet } from "ethers";

export interface State {
    userAddress: string;
    userPVK: string;
    userPBK: string;
    userWallet: Wallet | undefined;
}

export const initialState: State = {
    userAddress: "",
    userPVK: "",
    userPBK: "",
    userWallet: undefined,
};

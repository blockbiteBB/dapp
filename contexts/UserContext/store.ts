import { Wallet } from "ethers";

export interface State {
    address: string;
    userPVK: string;
    userPBK: string;
    userWallet: Wallet | undefined;
}

export const initialState: State = {
    address: "",
    userPVK: "",
    userPBK: "",
    userWallet: undefined,
};

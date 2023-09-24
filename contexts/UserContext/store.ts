import { Wallet } from "ethers";
import { Order } from "../RestaurantContext/store";

export interface State {
    userAddress: string;
    userPVK: string;
    userPBK: string;
    userWallet: Wallet | undefined;
    isDeliver: boolean;
    orders: any[];
}

export const initialState: State = {
    userAddress: "",
    userPVK: "",
    userPBK: "",
    userWallet: undefined,
    isDeliver: false,
    orders: [],
};

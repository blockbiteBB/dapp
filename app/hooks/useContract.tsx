import { useContractContext } from "@/contexts/ContractContext";
import { etherEatsAddress } from "@/lib/constants/contracts";
import { ethers, parseEther } from "ethers";
import { gasLimit, gasPrice } from "../utils/constants";
import { useModal } from "@/contexts/ModalContext";

const useContract = () => {
    const [{ erc20Token, contract, govToken }] = useContractContext();
    const [_, dispatchModal] = useModal();

    const approve = async (tokenAmount: string, contract: any) => {
        try {
            await contract.approve(etherEatsAddress, parseEther(tokenAmount), { gasLimit, gasPrice });
        } catch (e) {
            console.log(e);
        }
    };

    const createOrder = async (message: string, tokenAmount: string) => {
        try {
            await approve(tokenAmount, erc20Token);
            const encryptedParams = ethers.toUtf8Bytes(message);
            await contract.createOrder(encryptedParams, parseEther(tokenAmount), { gasLimit, gasPrice });
            dispatchModal({ type: "OPEN_MOBILE_MODAL" });
            dispatchModal({ type: "UPDATE_CONTENT", content: <div className="text-green-600">Order created!</div> });
        } catch (e) {
            console.log(e);
            dispatchModal({ type: "OPEN_MOBILE_MODAL" });
            dispatchModal({ type: "UPDATE_CONTENT", content: <div className="text-red-400">Something went wrong</div> });
        }
    };

    const stake = async (tokenAmount: string) => {
        try {
            await approve(tokenAmount, govToken);
            await contract.stakeTokens({ gasLimit, gasPrice });
            dispatchModal({ type: "OPEN_MOBILE_MODAL" });
            dispatchModal({ type: "UPDATE_CONTENT", content: <div className="text-green-600">You are officially an EtherEats driver</div> });
        } catch (e) {
            console.log(e);
            dispatchModal({ type: "OPEN_MOBILE_MODAL" });
            dispatchModal({ type: "UPDATE_CONTENT", content: <div className="text-red-400">Something went wrong</div> });
        }
    };

    return {
        createOrder,
        stake,
    };
};

export default useContract;

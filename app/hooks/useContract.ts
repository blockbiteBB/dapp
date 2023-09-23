import { useContractContext } from "@/contexts/ContractContext";
import { ethers, parseEther } from "ethers";

const useContract = () => {
    const [{ erc20Token, contract }] = useContractContext();

    const approve = async (tokenAmount: string) => {
        try {
            await erc20Token.approve(await contract.getAddress(), parseEther(tokenAmount));
            return true;
        } catch (e) {
            console.log(e);
        }
    };

    const createOrder = async (message: string, tokenAmount: string) => {
        try {
            await approve(tokenAmount);
            const encryptedParams = ethers.toUtf8Bytes(message);
            await contract.createOrder(encryptedParams, parseEther(tokenAmount));
        } catch (e) {
            console.log(e);
        }
    };

    return {
        createOrder,
    };
};

export default useContract;

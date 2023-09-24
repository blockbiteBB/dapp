"use client";

import { useUserContext } from "@/contexts/UserContext";
import { shortAddress, gasLimit, gasPrice } from "../utils/constants";
import { useContractContext } from "@/contexts/ContractContext";
import useContract from "../hooks/useContract";
import { useModal } from "@/contexts/ModalContext";

const UserPage = () => {
    const [{ userAddress }] = useUserContext();
    const [{ govToken }] = useContractContext();
    const [, dispatchModal] = useModal();
    const { stake } = useContract();

    const demoMint = async () => {
        try {
            await govToken.demoMint({ gasLimit, gasPrice });
            dispatchModal({ type: "OPEN_MOBILE_MODAL" });
            dispatchModal({ type: "UPDATE_CONTENT", content: <div className="text-green-600">Minted 100 tokens</div> });
        } catch (e) {
            console.log(e);
            dispatchModal({ type: "OPEN_MOBILE_MODAL" });
            dispatchModal({ type: "UPDATE_CONTENT", content: <div className="text-red-400">Something went wrong</div> });
        }
    };

    return (
        <div className="px-3 md:px-11 xl:px-32">
            <div className="my-20 text-2xl">
                Welcome <span className="font-bold">{shortAddress(userAddress)}</span>!!
            </div>
            <div className="w-full rounded-[24px] bg-[#FFF8DC] px-5 py-8 md:px-11 xl:w-3/5">
                <div className="">We&apos;ll ensure that all your data would remain private and encrypted.</div>
                <div className="mt-4 text-lg font-semibold">Join to become a delevery driver:</div>

                <div>(You have to buy governane tokens and stake them)</div>

                <div
                    onClick={demoMint}
                    className="mt-16 w-fit cursor-pointer rounded-full bg-[#FF914D] px-5 py-2 text-center text-base font-semibold text-brand-app-black lg:text-lg"
                >
                    Buy governance token
                </div>
                <div
                    onClick={() => stake("100")}
                    className="mt-4 w-fit cursor-pointer rounded-full bg-[#FF914D] px-5 py-2 text-center text-base font-semibold text-brand-app-black lg:text-lg"
                >
                    Stake and join
                </div>
            </div>
        </div>
    );
};

export default UserPage;

"use client";

import { CustomConnectButton } from "@/components/CustomConnectButton";
import { useContractContext } from "@/contexts/ContractContext";
import { useUserContext } from "@/contexts/UserContext";
import { etherEatsAddress } from "@/lib/constants/contracts";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import contractABIEtherEats from "@/lib/abis/mainAbi.json";

const Navbar = () => {
    const [{ address, userWallet }, dispatchUser] = useUserContext();
    const [{ lens }, dispatchContract] = useContractContext();
    const [lensTokenId, setLensTokenId] = useState(null);

    function getUserFromLocalStorage() {
        return localStorage.getItem("user");
    }

    const existingUser = getUserFromLocalStorage();

    const updateUser = (address: string, PBK: string, PVK: string) => {
        dispatchUser({ type: "UPDATE_ADDRESS", address: address });
        dispatchUser({ type: "UPDATE_USERPBK", userPBK: PBK });
        dispatchUser({ type: "UPDATE_USERPVK", userPVK: PVK });
    };

    const createWallet = async () => {
        const wallet = ethers.Wallet.createRandom();
        const { address, privateKey, publicKey } = wallet;
        updateUser(address, publicKey, privateKey);
        localStorage.setItem(
            "user",
            JSON.stringify({
                address: address,
                userPBK: publicKey,
                userPVK: privateKey,
            })
        );
    };

    useEffect(() => {
        if (existingUser) {
            const user = JSON.parse(existingUser);
            const { address, userPBK, userPVK } = user;
            updateUser(address, userPBK, userPVK);
        }
    }, [existingUser]);

    useEffect(() => {
        if (userWallet) {
            dispatchContract({
                type: "UPDATE_LENS",
                lens: new ethers.Contract(etherEatsAddress, contractABIEtherEats, userWallet),
            });
        }
    }, [userWallet]);

    const checkLens = async () => {
        try {
            const tokenAmount = await lens.balanceOf(address);
            if (Number(tokenAmount.toString()) > 0) {
                const firstToken = await lens.tokenOfOwnerByIndex(address, 0);
                setLensTokenId(firstToken.toString());
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (lens) {
            checkLens();
        }
    }, [lens]);

    return (
        <div className="flex justify-between px-3 py-8 md:px-11 xl:px-32">
            <Link href="/">
                <div className="flex items-center gap-1">
                    <div className="flex w-14 flex-col items-center justify-center text-center font-chillax text-4xl font-bold leading-4">
                        <span className="rotate-90 text-[#FFDB58]">B</span>
                        <span className="h-2 w-8 rounded-full bg-red-600"></span>
                        <div className="-rotate-90 text-[#FF914D]">B</div>
                    </div>
                    <div className="font-chillax text-xl font-bold tracking-wider xl:text-2xl">blockbite</div>
                </div>
            </Link>
            {!userWallet && (
                <button className="rounded-3xl bg-[#FF914D] px-6 py-2 font-chillax font-semibold" onClick={createWallet} type="button">
                    Register
                </button>
            )}
            {/* <CustomConnectButton /> */}
        </div>
    );
};

export default Navbar;

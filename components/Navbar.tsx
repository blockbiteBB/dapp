"use client";

import { useContractContext } from "@/contexts/ContractContext";
import { useUserContext } from "@/contexts/UserContext";
import { erc20Address, etherEatsAddress, govTokenAddress } from "@/lib/constants/contracts";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import contractABIEtherEats from "@/lib/abis/mainAbi.json";
import govTokenABI from "@/lib/abis/governanceAbi.json";
import erc20Abi from "@/lib/abis/erc20Abi.json";
import RegisterConnectDropdownBtn from "./_shared/RegisterConnectDropdownBtn";
import { useAccount } from "wagmi";
import { updateUser } from "@/app/utils/constants";

const Navbar = () => {
    const [{ userAddress, userPVK, userWallet }, dispatchUser] = useUserContext();
    const { address } = useAccount();
    const [{ contract }, dispatchContract] = useContractContext();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [lensTokenId, setLensTokenId] = useState(null);
    const realAddress = userAddress.length > 0 ? userAddress : address;

    function getUserFromLocalStorage() {
        return localStorage.getItem("user");
    }

    const existingUser = getUserFromLocalStorage();

    useEffect(() => {
        if (existingUser) {
            const user = JSON.parse(existingUser);
            const { address, userPBK, userPVK } = user;
            updateUser(address, userPBK, userPVK, dispatchUser);
        }
    }, [existingUser]);

    useEffect(() => {
        const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
        if (userWallet)
            dispatchContract({
                type: "UPDATE_CONTRACT",
                contract: new ethers.Contract(etherEatsAddress, contractABIEtherEats, userWallet),
            });

        dispatchContract({
            type: "UPDATE_GOVTOKEN",
            govToken: new ethers.Contract(govTokenAddress, govTokenABI, userWallet),
        });

        dispatchContract({
            type: "UPDATE_ERC20TOKEN",
            erc20Token: new ethers.Contract(erc20Address, erc20Abi, userWallet),
        });
    }, [userWallet]);

    console.log("contract", contract);

    useEffect(() => {
        if (userPVK) {
            const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");

            const wallet = new ethers.Wallet(userPVK, provider);

            dispatchUser({ type: "UPDATE_USERWALLET", userWallet: wallet });
        }
    }, [userPVK]);

    // const checkLens = async () => {
    //     try {
    //         const tokenAmount = await lens.balanceOf(realAddress);
    //         if (Number(tokenAmount.toString()) > 0) {
    //             const firstToken = await lens.tokenOfOwnerByIndex(realAddress, 0);
    //             setLensTokenId(firstToken.toString());
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     if (lens) {
    //         checkLens();
    //     }
    // }, [lens]);

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

            <RegisterConnectDropdownBtn
                title={!realAddress ? "Register" : undefined}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                address={realAddress}
            />
        </div>
    );
};

export default Navbar;

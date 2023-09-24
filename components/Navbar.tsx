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
import { useQuery } from "@tanstack/react-query";
import { fetchOrders, fetchUser } from "@/app/utils/constants/query";

const Navbar = () => {
    const [{ userAddress, userPVK, userWallet }, dispatchUser] = useUserContext();
    const { address } = useAccount();
    const [_, dispatchContract] = useContractContext();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const realAddress = userAddress.length > 0 ? userAddress : address;
    const { data, isLoading, error } = useQuery(["user"], fetchUser);

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
        if (!isLoading && data) {
            const userFound = data.find((user: any) => user.id.toLowerCase() === realAddress?.toLowerCase());
            if (!userFound) {
                dispatchUser({ type: "UPDATE_ISDELIVER", isDeliver: false });
                return;
            }
            dispatchUser({ type: "UPDATE_ISDELIVER", isDeliver: true });
        }
    }, [data]);

    useEffect(() => {
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

    useEffect(() => {
        if (userPVK) {
            const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");

            const wallet = new ethers.Wallet(userPVK, provider);

            dispatchUser({ type: "UPDATE_USERWALLET", userWallet: wallet });
        }
    }, [userPVK]);

    useEffect(() => {
        if (userAddress) {
            const fetch = async () => {
                const { orders } = await fetchOrders(userAddress);
                dispatchUser({ type: "UPDATE_ORDERS", orders });
            };

            fetch();
        }
    }, [userAddress]);

    return (
        <div className="flex justify-between px-3 py-8 md:px-11 xl:px-32">
            <Link href="/">
                <div className="flex items-center gap-1">
                    <div className="flex w-14 flex-col items-center justify-center text-center font-chillax text-4xl font-bold leading-4">
                        <span className="rotate-90 text-[#FFDB58]">B</span>
                        <span className="h-2 w-8 rounded-full bg-red-600"></span>
                        <div className="-rotate-90 text-[#FF914D]">B</div>
                    </div>
                    <div className="font-chillax text-xl font-bold tracking-wider xl:text-2xl">EtherEats</div>
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

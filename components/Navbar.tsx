"use client";

import { useContractContext } from "@/contexts/ContractContext";
import { useUserContext } from "@/contexts/UserContext";
import { etherEatsAddress, provider } from "@/lib/constants/contracts";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import contractABIEtherEats from "@/lib/abis/mainAbi.json";
import RegisterConnectDropdownBtn from "./_shared/RegisterConnectDropdownBtn";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

const Navbar = () => {
    const [{ userAddress, userPBK }, dispatchUser] = useUserContext();
    const { address } = useAccount();
    const [{ lens }, dispatchContract] = useContractContext();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [lensTokenId, setLensTokenId] = useState(null);
    const realAddress = userAddress.length > 0 ? userAddress : address;

    function getUserFromLocalStorage() {
        return localStorage.getItem("user");
    }

    const { disconnect } = useDisconnect();

    const handleDisconnect = () => {
        setOpenMenu(false);
        disconnect();
    };

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
        if (provider) {
            dispatchContract({
                type: "UPDATE_LENS",
                lens: new ethers.Contract(etherEatsAddress, contractABIEtherEats, provider),
            });
        }
    }, [provider]);

    const checkLens = async () => {
        try {
            const tokenAmount = await lens.balanceOf(realAddress);
            if (Number(tokenAmount.toString()) > 0) {
                const firstToken = await lens.tokenOfOwnerByIndex(realAddress, 0);
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

            <RegisterConnectDropdownBtn
                title={!realAddress ? "Register" : undefined}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                address={realAddress}
            >
                {openMenu && !realAddress && (
                    <div className="absolute -left-0.5 top-10 w-[180px] rounded-b-3xl border-x-2 border-b-2 border-[#FF914D] bg-[#1C1C1E] font-chillax text-white md:w-[268px]">
                        <hr />
                        <div>
                            <div onClick={createWallet} className="mt-6 flex cursor-pointer items-center gap-2 px-4 md:gap-4 md:px-6">
                                <img src="/icons/profile.svg" alt="profile" className="w-4 md:w-6" />
                                <div>Create account</div>
                            </div>
                            <ConnectButton.Custom>
                                {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                                    // Note: If your app doesn't use authentication, you
                                    // can remove all 'authenticationStatus' checks
                                    const ready = mounted && authenticationStatus !== "loading";
                                    const connected =
                                        ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                                    return (
                                        <div
                                            {...(!ready && {
                                                "aria-hidden": true,
                                                style: {
                                                    opacity: 0,
                                                    pointerEvents: "none",
                                                    userSelect: "none",
                                                },
                                            })}
                                        >
                                            {(() => {
                                                if (!connected) {
                                                    return (
                                                        <div
                                                            onClick={() => openConnectModal()}
                                                            className="mb-6 mt-6 flex cursor-pointer items-center gap-2 px-4 md:gap-4 md:px-6"
                                                        >
                                                            <img src="/icons/calendar_blank.svg" alt="calendar blank" className="w-4 md:w-6" />
                                                            <div>Use your wallet</div>
                                                        </div>
                                                    );
                                                }

                                                if (chain.unsupported) {
                                                    return (
                                                        <div
                                                            onClick={openChainModal}
                                                            className="cursort-pointer mb-6 mt-6 flex items-center gap-2 px-4 md:gap-4 md:px-6"
                                                        >
                                                            <img src="/icons/calendar_blank.svg" alt="calendar blank" className="w-4 md:w-6" />
                                                            <div>Wrong netowrk</div>
                                                        </div>
                                                    );
                                                }
                                            })()}
                                        </div>
                                    );
                                }}
                            </ConnectButton.Custom>
                        </div>
                    </div>
                )}
                {openMenu && realAddress && (
                    <div className="absolute -left-0.5 top-10 w-[180px] rounded-b-3xl border-x-2 border-b-2 border-[#FF914D] bg-[#1C1C1E] font-chillax text-white md:w-[268px]">
                        <hr />
                        <div>
                            <div className="mt-6 flex items-center gap-2 px-4 md:gap-4 md:px-6">
                                <img src="/icons/profile.svg" alt="profile" className="w-4 md:w-6" />
                                <div>Profile</div>
                            </div>
                            <div className="mb-6 mt-6 flex items-center gap-2 px-4 md:gap-4 md:px-6">
                                <img src="/icons/calendar_blank.svg" alt="calendar blank" className="w-4 md:w-6" />
                                <div>My orders</div>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className="mt-6 flex items-center gap-2 px-4 md:gap-4 md:px-6">
                                <img src="/icons/settings.svg" alt="settings" className="w-4 md:w-6" />
                                <div>Settings</div>
                            </div>
                            {!userPBK ? (
                                <div
                                    onClick={() => handleDisconnect()}
                                    className="mb-6 mt-6 flex cursor-pointer items-center gap-2 px-4 md:gap-4 md:px-6"
                                >
                                    <img src="/icons/logout.svg" alt="logout" className="w-4 md:w-6" />
                                    <div>Logout</div>
                                </div>
                            ) : (
                                <div className="mb-6 mt-6" />
                            )}
                        </div>
                    </div>
                )}
            </RegisterConnectDropdownBtn>
        </div>
    );
};

export default Navbar;

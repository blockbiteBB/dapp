"use client";

import { shortAddress, updateUser, gasLimit, gasPrice } from "@/app/utils/constants";
import { useContractContext } from "@/contexts/ContractContext";
import { useModal } from "@/contexts/ModalContext";
import { useUserContext } from "@/contexts/UserContext";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import Link from "next/link";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useDisconnect } from "wagmi";

interface Props {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    openMenu: boolean;
    address?: string;
    title?: string;
}

const RegisterConnectDropdownBtn = ({ setOpenMenu, openMenu, address, title }: Props) => {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const [{ userPBK }, dispatchUser] = useUserContext();
    const [{ erc20Token }] = useContractContext();
    const [_, dispatchModal] = useModal();
    const ref = useRef(null);

    const { disconnect } = useDisconnect();

    const createWallet = async () => {
        const wallet = ethers.Wallet.createRandom();
        const { address, privateKey, publicKey } = wallet;
        updateUser(address, publicKey, privateKey, dispatchUser);
        localStorage.setItem(
            "user",
            JSON.stringify({
                address: address,
                userPBK: publicKey,
                userPVK: privateKey,
            })
        );
    };

    const demoMint = async () => {
        try {
            await erc20Token.demoMint(ethers.parseEther("100"), { gasLimit, gasPrice });
            dispatchModal({ type: "OPEN_MOBILE_MODAL" });
            dispatchModal({ type: "UPDATE_CONTENT", content: <div className="text-green-600">Minted 100 tokens</div> });
        } catch (e) {
            console.log(e);
            dispatchModal({ type: "OPEN_MOBILE_MODAL" });
            dispatchModal({ type: "UPDATE_CONTENT", content: <div className="text-red-400">Something went wrong</div> });
        }
    };

    const handleDisconnect = () => {
        setOpenMenu(false);
        disconnect();
    };

    const copyToClipboard = (e: any, account: any) => {
        e.stopPropagation();

        console.log("account", account);
        navigator.clipboard
            .writeText(account)
            .then(() => {
                setCopySuccess(true);
                // Optional: Reset the success icon after some time
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    const handleClickOutside = () => {
        setOpenMenu(false);
    };

    useOnClickOutside(ref, handleClickOutside);

    return (
        <div
            ref={ref}
            onClick={() => setOpenMenu(!openMenu)}
            className={`relative flex w-[180px] cursor-pointer flex-col bg-[#FF914D] md:w-[268px] ${
                openMenu ? "rounded-t-3xl border-x-2 border-t-2 border-[#FF914D]" : "rounded-3xl"
            }`}
        >
            <div className="flex items-center justify-around px-3 py-2">
                <div className=""></div>
                <div className="">
                    {address && (
                        <FontAwesomeIcon
                            icon={copySuccess ? faCheck : faCopy}
                            onClick={(e) => copyToClipboard(e, address)}
                            style={{ cursor: "pointer", marginRight: "5px" }}
                        />
                    )}
                    {title ? title : shortAddress(address ? address : "")}
                </div>
                <img src={`/icons/${openMenu ? "x" : "arrowdown"}.svg`} alt="arrowdown" className="aspect-square w-5" />
            </div>

            {openMenu && !address && (
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
                                const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

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

            {openMenu && address && (
                <div className="absolute -left-0.5 top-10 w-[180px] rounded-b-3xl border-x-2 border-b-2 border-[#FF914D] bg-[#1C1C1E] font-chillax text-white md:w-[268px]">
                    <hr />
                    <div>
                        <Link href="/user">
                            <div className="mt-6 flex items-center gap-2 px-4 md:gap-4 md:px-6">
                                <img src="/icons/profile.svg" alt="profile" className="w-4 md:w-6" />
                                <div>Profile</div>
                            </div>
                        </Link>
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
                            <div onClick={() => demoMint()} className="mb-6 mt-6 flex cursor-pointer items-center gap-2 px-4 md:gap-4 md:px-6">
                                <img src="/icons/settings.svg" alt="settings" className="w-4 md:w-6" />
                                <div>Mint for demo</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterConnectDropdownBtn;

"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useDisconnect } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

export const CustomConnectButton = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const ref = useRef(null);
    const { disconnect } = useDisconnect();

    const copyToClipboard = (e: any, account: any) => {
        e.stopPropagation();

        navigator.clipboard
            .writeText(account.address)
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

    const handleDisconnect = () => {
        setOpenMenu(false);
        disconnect();
    };

    useOnClickOutside(ref, handleClickOutside);
    return (
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
                                    <button
                                        className="rounded-3xl bg-[#FF914D] px-6 py-2 font-chillax font-semibold"
                                        onClick={openConnectModal}
                                        type="button"
                                    >
                                        Connect Wallet
                                    </button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }

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
                                            <FontAwesomeIcon
                                                icon={copySuccess ? faCheck : faCopy}
                                                onClick={(e) => copyToClipboard(e, account)}
                                                style={{ cursor: "pointer", marginRight: "5px" }}
                                            />
                                            {account.displayName}
                                        </div>
                                        <img src={`/icons/${openMenu ? "x" : "arrowdown"}.svg`} alt="arrowdown" className="aspect-square w-5" />
                                    </div>

                                    {openMenu && (
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
                                                <div
                                                    onClick={() => handleDisconnect()}
                                                    className="mb-6 mt-6 flex cursor-pointer items-center gap-2 px-4 md:gap-4 md:px-6"
                                                >
                                                    <img src="/icons/logout.svg" alt="logout" className="w-4 md:w-6" />
                                                    <div>Logout</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

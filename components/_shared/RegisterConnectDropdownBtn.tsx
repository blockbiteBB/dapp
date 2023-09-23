"use client";

import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    openMenu: boolean;
    address?: string;
    children: React.ReactNode;
    title?: string;
}

const RegisterConnectDropdownBtn = ({ setOpenMenu, openMenu, address, children, title }: Props) => {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const ref = useRef(null);

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
                    {title ? title : address?.substring(0, 6) + "..." + address?.substring(address?.length - 4)}
                </div>
                <img src={`/icons/${openMenu ? "x" : "arrowdown"}.svg`} alt="arrowdown" className="aspect-square w-5" />
            </div>

            {children}
        </div>
    );
};

export default RegisterConnectDropdownBtn;

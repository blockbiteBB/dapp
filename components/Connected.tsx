"use client";

import { useUser } from "@/contexts/UserContext";
import { aroundMembershipContract } from "@/lib/constants/contracts";
import { useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";

export function Connected({ children }: { children: React.ReactNode }) {
    const { address, isConnected } = useAccount();
    const [{ isWhitelisted, membershipId }, dispatch] = useUser();

    const runApp = async () => {
        const response = await fetch("/api/moralis-nft", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address: address }),
        });

        const responseJson = await response.json();

        const membership = responseJson.data.result.find((nft: any) => nft.token_address === aroundMembershipContract.address.toLowerCase());

        if (membership) {
            dispatch({ type: "SET_MEMBERSHIPID", membershipId: membership.token_id });
        } else {
            dispatch({ type: "SET_MEMBERSHIPID", membershipId: "0" });
        }

        dispatch({ type: "SET_NFTS", nfts: responseJson });
    };

    useEffect(() => {
        if (!isConnected) return;
        runApp();
    }, [address, isConnected]);

    const { data, isSuccess, isLoading } = useContractRead({
        address: aroundMembershipContract.address,
        abi: aroundMembershipContract.abi,
        functionName: "getWhitelisted",
        enabled: address !== undefined,
        args: [address],
    });

    const fetchApplication = async () => {
        const SPREADSHEET_ID = "1KyjLSyFlmHGIWfbdKcSAH4wBthaCEx6cix98dQK3ilY";
        const RANGE = "Sheet1!B:B";
        const SHEETS_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=AIzaSyDoHH2s-ADDx96lplLb6ba-HPFOQuJVNdo`;
        const response = await fetch(SHEETS_URL);
        const data = await response.json();
        const addresses = data.values.map((row: any) => row[0]).slice(1);

        dispatch({ type: "SET_APPLIED", didApply: addresses.includes(address) });
    };

    useEffect(() => {
        if (data === undefined || data === null) return;
        dispatch({ type: "SET_WHITELISTED", isWhitelisted: Boolean(data) });
    }, [data]);

    useEffect(() => {
        if (isWhitelisted === null || membershipId === null) return;
        if (membershipId === "0" && isWhitelisted === false) {
            // not member not whitelisted
            // fetch google api
            fetchApplication();
        } else {
            dispatch({ type: "SET_APPLIED", didApply: false });
        }
    }, [isWhitelisted, membershipId]);

    if (!isConnected) return null;

    return <>{children}</>;
}

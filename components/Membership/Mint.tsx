import { useContractEvent, useContractWrite, useWaitForTransaction } from "wagmi";
import { aroundMembershipContract } from "@/lib/constants/contracts";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

export default function Mint() {
    const [{}, dispatch] = useUser();
    const unwatch = useContractEvent({
        address: aroundMembershipContract.address,
        abi: aroundMembershipContract.abi,
        eventName: "MembershipMinted",
        listener(log: any) {
            dispatch({ type: "SET_MEMBERSHIPID", membershipId: log[0].args.tokenId.toString() });
            unwatch?.();
        },
    });
    const { data, write } = useContractWrite({
        address: aroundMembershipContract.address,
        abi: aroundMembershipContract.abi,
        functionName: "mintMembership",
    });
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    return (
        <div className="align-center flex flex-grow flex-col items-center justify-between">
            <h1 className="mb-4 mt-4 font-chillax text-2xl font-bold text-white">around membership pass 2023</h1>
            <div className="font-source-code-pro px-6 leading-relaxed tracking-[0] text-white">
                <span className="font-medium">
                    the around membership pass grants holders access to:
                    <br />
                </span>
                <div className="mt-4">
                    <span className="font-light">
                        ✱ the around platform
                        <br />✱ private community of web3 nomads
                        <br />✱ hand-selected premium stays in prime crypto + digital nomad locations
                        <br />✱ exclusive co-living/working/vibing experiences around major conferences
                        <br />✱ network of partner perks
                        <br />✱ and more
                    </span>
                </div>
            </div>
            <div className="mt-2 h-[18px] w-[247px]">
                <p className="font-montserrat items-center text-xs text-[#7b7b7b]">valid for 6 months from date of mint</p>
            </div>
            <div className="h-[32px] w-[247px]">
                <button
                    disabled={isLoading || isSuccess}
                    className="text-brand-app-black flex h-[32px] w-[247px] items-center justify-center bg-[#d9d9d9] font-bold"
                    onClick={() => write()}
                >
                    {/* todo add spinner */}
                    {isLoading ? "Minting" : isSuccess ? "Membership Minted" : "Mint Membership"}
                </button>
            </div>
        </div>
    );
}

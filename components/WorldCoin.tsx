import { IDKitWidget, solidityEncode } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import worldCoinLogo from "/public/img/logos/worldcoin-logo.jpeg";
import Image from "next/image";
import { useContractContext } from "@/contexts/ContractContext";
import { useAccount } from "wagmi";
import { AbiCoder } from "ethers";
import { useRouter } from "next/router";

const WorldcoinVerify = () => {
    const { address } = useAccount();
    const [{ multiChainVerifier }] = useContractContext();
    const router = useRouter();

    const button = { label: "WorldCoin", img: worldCoinLogo, color: "text-black", diabled: false };

    const handleProof = async (result: ISuccessResult) => {
        try {
            const unpackedProof = AbiCoder.defaultAbiCoder().decode(["uint256[8]"], result.proof)[0];
            const tx = await multiChainVerifier.registerWithWorldcoin(address, result.merkle_root, result.nullifier_hash, unpackedProof, 137);
            const recipte = await tx.wait();
            if (recipte.status == 1) {
                console.log("verified");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <IDKitWidget
                action="app_4dbefa59fdf71b9b734938badbf9c23b"
                signal={solidityEncode(["address"], [address])}
                handleVerify={handleProof}
                app_id="app_4dbefa59fdf71b9b734938badbf9c23b"
                // walletConnectProjectId="get_this_from_walletconnect_portal"
                onSuccess={() => router.push("/")}
            >
                {({ open }) => (
                    <div
                        onClick={open}
                        className={`flex ${button.color} ${
                            button.diabled && "cursor-not-allowed bg-gray-600 text-white"
                        } w-[400px] cursor-pointer items-center gap-5 rounded-lg shadow-md dark:bg-white`}
                    >
                        {button.img && (
                            <div className="relative h-[50px] w-[50px]">
                                <Image src={button.img} alt="logo" fill className="rounded-lg" />
                            </div>
                        )}
                        <div className={`w-[150px] rounded py-3 text-lg font-semibold ${button.label === "No ID" && "ml-[70px]"}`}>
                            {button.label}
                        </div>
                    </div>
                )}
            </IDKitWidget>
        </>
    );
};

export default WorldcoinVerify;

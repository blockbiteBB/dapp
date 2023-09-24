import { IDKitWidget, solidityEncode } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import worldCoinLogo from "/public/worldcoin-logo.png";
import Image from "next/image";
import { useContractContext } from "@/contexts/ContractContext";
import { AbiCoder } from "ethers";
import { useUserContext } from "@/contexts/UserContext";

const WorldcoinVerify = () => {
    const [{ userAddress }] = useUserContext();
    const [{ contract }] = useContractContext();

    const button = { label: "Verify with WorldCoin", img: worldCoinLogo, color: "text-black", diabled: false };

    const handleProof = async (result: ISuccessResult) => {
        try {
            const unpackedProof = AbiCoder.defaultAbiCoder().decode(["uint256[8]"], result.proof)[0];
            const tx = await contract.registerWithWorldcoin(userAddress, result.merkle_root, result.nullifier_hash, unpackedProof, 137);
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
                action="app_cf7b0a01ee70399870f809549d821f10"
                signal={solidityEncode(["address"], [userAddress])}
                handleVerify={handleProof}
                app_id="app_cf7b0a01ee70399870f809549d821f10"
                // walletConnectProjectId="get_this_from_walletconnect_portal"
                onSuccess={() => console.log("success")}
            >
                {({ open }) => (
                    <div
                        onClick={open}
                        className={`mt-4 flex ${button.color} ${
                            button.diabled && "cursor-not-allowed bg-gray-600 text-white"
                        } w-fit cursor-pointer items-center gap-5 rounded-full bg-black px-10 shadow-md dark:bg-white`}
                    >
                        {button.img && (
                            <div className="relative h-[50px] w-[50px]">
                                <Image src={button.img} alt="logo" objectFit="cover" fill className="rounded-lg" />
                            </div>
                        )}
                        <div className={`w-fit rounded py-3 text-lg font-semibold ${button.label === "No ID" && "ml-10"}`}>{button.label}</div>
                    </div>
                )}
            </IDKitWidget>
        </>
    );
};

export default WorldcoinVerify;

import { CustomConnectButton } from "@/components/CustomConnectButton";
import Link from "next/link";

const Navbar = () => {
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
            <CustomConnectButton />
        </div>
    );
};

export default Navbar;

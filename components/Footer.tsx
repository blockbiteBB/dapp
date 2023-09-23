"use client";

import { socialIcons } from "@/app/utils/constants/socials";
import Image from "next/image";

export const Footer = () => {
    return (
        <div className="bg-brand-app-orange mt-12 flex w-full flex-col items-center px-6 py-6 md:px-12 lg:px-20 xl:px-32">
            <div className="mt-16 h-[1px] w-full bg-brand-black"></div>
            <div className="flex w-full items-center justify-between py-4">
                <div className="font-chillax text-sm font-medium text-brand-black/60 md:text-base xl:text-lg">© BlockBite. all rights reserved</div>
                <div className="flex items-center gap-2 md:gap-3">
                    {socialIcons.map((icon, i) => (
                        <a key={i} href={icon.href} target="_blank" className="cursor-pointer">
                            <Image src={icon.img} alt={icon.alt} width={i === 4 ? 16 : 20} height={i === 4 ? 16 : 20} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Footer;

import aroundMembershipAbi from "@/lib/abis/AroundGuestMembership.json";
import aroundHostAbi from "@/lib/abis/AroundHost.json";
import aroundEventsAbi from "@/lib/abis/AroundEvents.json";
import { erc20ABI } from "wagmi";

export const aroundMembershipContract = {
    address: "0x52f4ce0C92CdCCC7d2AA7f3DB23697c7a83E394D",
    abi: aroundMembershipAbi.abi,
} as const;

export const aroundHostContract = {
    address: "0xa7f7E99dE512A321000823f1f419329633F87E0b",
    abi: aroundHostAbi.abi,
} as const;

export const aroundEventsContract = {
    address: "0x0D1Bc17b72b18090c23B12f07d1ec7Ad46E08e1b",
    abi: aroundEventsAbi.abi,
} as const;

export const usdcMumbaiContract = {
    address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
    abi: erc20ABI,
} as const;

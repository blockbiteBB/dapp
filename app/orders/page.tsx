"use client";

import { useUserContext } from "@/contexts/UserContext";
import { useState } from "react";

const Orders = () => {
    const [{ orders, isDeliver }] = useUserContext();
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const ordersList = [1, 2, 3, 4];

    return (
        <div className="px-3 md:px-11 xl:px-32">
            <div className="my-20 text-2xl">{isDeliver ? "All orders available" : "Your orders"}</div>
            <div className="mt-10 flex flex-col items-stretch gap-7 text-lg md:text-xl lg:flex-row xl:gap-11 xl:text-2xl">
                <div className="w-full rounded-[24px] bg-[#FFF8DC] px-5 py-8 md:px-11 xl:w-3/5">
                    {ordersList.map((order, i) => (
                        <div key={i}>
                            <div
                                onClick={() => (openMenu === i ? setOpenMenu(null) : setOpenMenu(i))}
                                className="flex w-full items-center justify-between"
                            >
                                <div>order {order}</div>
                                <div className={`${openMenu === i ? "rotate-90" : "-rotate-90"}`}>{"<"}</div>
                            </div>
                            {openMenu === i && (
                                <div className="my-3 rounded-xl bg-brand-black p-4">
                                    <div className="flex items-start justify-between text-white">
                                        <div>3 hamburger</div>
                                        <div>Mac Global</div>
                                    </div>
                                    <div className="mb-3 flex items-start justify-between">
                                        {!isDeliver && (
                                            <div
                                                onClick={() => console.log("accept order")}
                                                className="mt-4 w-fit cursor-pointer rounded-full bg-[#FF914D] px-5 py-2 text-center text-base font-semibold text-brand-app-black lg:text-lg"
                                            >
                                                Accept order
                                            </div>
                                        )}
                                        <div
                                            onClick={() => console.log("cancel order")}
                                            className="mt-4 w-fit cursor-pointer rounded-full bg-red-500 px-5 py-2 text-center text-base font-semibold text-brand-app-black lg:text-lg"
                                        >
                                            Cancel order
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex w-full flex-col justify-between rounded-[24px] bg-[#FFE4B5] px-6 py-9 pb-12 xl:w-2/5 xl:p-9">
                    <div className="flex items-center justify-between">
                        <div className="font-bold">asd</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;

"use client";

import Link from "next/link";
import { Restaurant } from "@/app/utils/types";

export default function RestaurantCard({ restaurant, id }: { restaurant: Restaurant; id: number }) {
    return (
        <div className="mt-16 rounded-lg border-2 border-[#FFDB58] bg-gray-100 bg-opacity-5 ">
            <div className="flex items-center justify-center rounded-t-lg bg-[#FFF8DC] p-4">
                <img
                    src={restaurant.image}
                    alt={restaurant.restaurant_name}
                    className="aspect-square aspect-square w-[280px] rounded-full lg:w-[362px]"
                />
            </div>
            <div className="mt-6 flex justify-center gap-3">
                <div className="flex items-center justify-center gap-3 rounded-full bg-btn px-4 py-2 lg:px-6">
                    <div className="font-source-code-pro text-center text-base font-semibold uppercase leading-5 text-white lg:text-lg">
                        {restaurant.restaurant_location}
                    </div>
                </div>
            </div>
            <div className="mt-8 flex items-center justify-center">
                <div className="font-chillax text-2xl font-bold lg:text-4xl">{restaurant.restaurant_name}</div>
            </div>
            <div className="my-7 flex justify-center gap-4 font-montserrat">
                <Link href={`/restaurants/${id}`}>
                    <div className="w-32 rounded-full bg-[#FF914D] px-7 py-3.5 text-center text-base font-semibold text-brand-app-black lg:text-lg">
                        Order
                    </div>
                </Link>
            </div>
        </div>
    );
}

"use client";

import { restaurants } from "@/app/utils/constants";
import RestaurantCard from "./RestaurantCard";
import { Restaurant } from "@/app/utils/types";

const Restaurants = () => {
    return (
        <div className="grid gap-4 sm:gap-0 md:grid-cols-2">
            {restaurants?.map((restaurant: Restaurant, i: number) => (
                <div key={i} className="flex justify-center">
                    <RestaurantCard restaurant={restaurant} id={i} />
                </div>
            ))}
        </div>
    );
};

export default Restaurants;

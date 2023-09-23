"use client";

import Restaurants from "./Restaurants";

const Main = () => {
    return (
        <div>
            <div className="pt-12 text-center font-chillax text-4xl font-semibold md:text-5xl lg:text-left xl:text-6xl">Find food close to you</div>
            <div>
                <Restaurants />
            </div>
        </div>
    );
};

export default Main;

import { detailIcons } from "@/app/utils/constants";
import { Food } from "@/app/utils/types";
import { useResaurant } from "@/contexts/RestaurantContext";
import { useEffect } from "react";

interface EventInfoProps {
    description: string;
    food: Food | null;
}

const RestaurantInfo = ({ description, food }: EventInfoProps) => {
    const [_, dispatch] = useResaurant();

    const handleClick = () => {
        dispatch({
            type: "ADD_OR_UPDATE_ITEM",
            food: food as Food,
        });
    };

    const top = () => (
        <>
            <div className="grid grid-cols-2 gap-6 md:w-fit md:grid-cols-3 lg:gap-12"></div>
            <div className="mt-8 w-full md:w-11/12">{description}</div>
        </>
    );

    useEffect(() => {
        return () => {
            dispatch({
                type: "RESET_ORDER",
            });
        };
    }, []);

    const bottom = () => (
        <div className="mt-14 grid gap-7 md:mt-32 md:grid-cols-2 md:gap-10 lg:gap-14">
            <div className="flex items-center gap-6">
                {food && (
                    <div>
                        <div className="font-bold">{food.name}</div>
                        <div className="mt-3">{food.description}</div>
                        {detailIcons.map((icon, index) => (
                            <div
                                onClick={handleClick}
                                key={index}
                                className="bg-brand-app-orange mt-8 flex items-center justify-center gap-3 rounded-[24px] border px-4 py-2 md:px-7 md:py-4 xl:gap-6"
                            >
                                <img src={icon.src} alt={icon.alt} className="w-4 md:w-5 xl:w-6" width={0} height={0} />
                                <div className={icon.isGray ? "text-brand-app-black" : ""}>Add +</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full rounded-[24px] bg-[#FFF8DC] px-5 py-8 md:px-11 xl:w-3/5">
            {top()}
            {bottom()}
        </div>
    );
};

export default RestaurantInfo;

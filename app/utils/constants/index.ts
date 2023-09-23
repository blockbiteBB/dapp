import { parseUnits } from "ethers";
import { IconDetail, Restaurant } from "../types";

export const detailIcons: IconDetail[] = [
    {
        src: "/icons/cart.png",
        alt: "Cart icon",
        label: "Basket",
        isGray: true,
    },
];

export const restaurants: Restaurant[] = [
    {
        name: "",
        description: "",
        image: "/restaurants/logo-1.jpeg",
        restaurant_name: "MC Global",
        restaurant_location: "New York, US",
        restaurant_description: "MC Global is a restaurant that serves a variety of dishes from around the world. We are located in New York, US.",
        food: [
            {
                name: "French Fries",
                image: "/restaurants/food/fries.jpeg",
                description:
                    "French fries are served hot, either soft or crispy, and are generally eaten as part of lunch or dinner or by themselves as a snack.",
                price: 5,
            },
            {
                name: "Burger",
                image: "/restaurants/food/burger.jpeg",
                description:
                    "A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
                price: 10,
            },
            {
                name: "Caffe",
                image: "/restaurants/food/caffe.jpeg",
                description: "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.",
                price: 3,
            },
        ],
    },
    {
        name: "",
        description: "",
        image: "/restaurants/logo-2.jpeg",
        restaurant_name: "Burger Global",
        restaurant_location: "New York, US",
        restaurant_description:
            "Burger Global is a restaurant that serves a variety of dishes from around the world. We are located in New York, US.",
        food: [
            {
                name: "French Fries",
                image: "/restaurants/food/fries.jpeg",
                description:
                    "French fries are served hot, either soft or crispy, and are generally eaten as part of lunch or dinner or by themselves as a snack.",
                price: 6,
            },
            {
                name: "Burger",
                image: "/restaurants/food/burger.jpeg",
                description:
                    "A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
                price: 12,
            },
            {
                name: "Caffe",
                image: "/restaurants/food/caffe.jpeg",
                description: "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.",
                price: 4.5,
            },
        ],
    },
];

export const updateUser = (address: string, PBK: string, PVK: string, dispatchUser: any) => {
    dispatchUser({ type: "UPDATE_ADDRESS", address: address });
    dispatchUser({ type: "UPDATE_USERPBK", userPBK: PBK });
    dispatchUser({ type: "UPDATE_USERPVK", userPVK: PVK });
};

export const shortAddress = (address: string) => {
    return address?.substring(0, 5) + "..." + address?.substring(address?.length - 4);
};

export const gasLimit = 300000;
export const gasPrice = parseUnits("100", "gwei");

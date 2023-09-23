export type IconDetail = {
    src: string;
    alt: string;
    label: string;
    isGray?: boolean;
};

export interface Restaurant {
    name: string;
    description: string;
    image: string;
    restaurant_name: string;
    restaurant_location: string;
    restaurant_description: string;
    food: Food[];
}

export interface Food {
    image: string;
    name: string;
    description: string;
    price: number;
}

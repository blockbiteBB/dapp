import Link from "next/link";

interface EventDescriptionProps {
    info: {
        title: string;
        location: string;
    };
}

const RestaurantDescription = ({ info }: EventDescriptionProps) => {
    const { title, location } = info;
    return (
        <>
            <Link href="/">
                <div className="cursor-pointer text-xl font-medium xl:text-2xl">back</div>
            </Link>
            <div className="mt-6 flex flex-col gap-3 text-[32px] md:text-[40px] xl:flex-row xl:items-center xl:gap-8 xl:text-[50px]">
                <div className="font-bold">{title}</div>
            </div>
            <div className="mb-12 mt-3 flex flex-col gap-4 text-xl text-brand-app-gray md:flex-row md:items-center md:gap-10 xl:text-2xl">
                <div>
                    <span className="font-bold">Location</span> 📍 {location}
                </div>
            </div>
        </>
    );
};

export default RestaurantDescription;

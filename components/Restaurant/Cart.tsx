import useContract from "@/app/hooks/useContract";
import { detailIcons } from "@/app/utils/constants";
import { useResaurant } from "@/contexts/RestaurantContext";

interface CartProps {
    name: string;
}

const Cart = ({ name }: CartProps) => {
    const [{ order }] = useResaurant();
    const { createOrder } = useContract();

    const totalPrice = order.reduce((accumulatedPrice, currentItem) => {
        return accumulatedPrice + currentItem.price * currentItem.quantity;
    }, 0);

    return (
        <div className="flex w-full flex-col justify-between rounded-[24px] bg-[#FFE4B5] px-6 py-9 pb-12 xl:w-2/5 xl:p-9">
            <div className="flex items-center justify-between">
                <div className="font-bold">{name}</div>
            </div>

            <div className="mt-7 flex items-center gap-2.5 xl:gap-5">
                {detailIcons.map((icon, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center gap-3 rounded-[24px] border border-black px-4 py-2 md:px-7 md:py-4 xl:gap-6"
                    >
                        <img src={icon.src} alt={icon.alt} className="w-4 md:w-5 xl:w-6" width={0} height={0} />
                        <div className={icon.isGray ? "text-brand-app-black" : ""}>{icon.label}</div>
                    </div>
                ))}
            </div>

            <div className="mt-14">
                {order.map((item, index) => (
                    <div key={index} className={`mt-3 flex items-center justify-between`}>
                        <div>{item.name}</div>
                        <div className="flex items-center gap-2">
                            <div>{item.price} GHO</div>
                            <div>x{item.quantity}</div>
                        </div>
                    </div>
                ))}
                <div className={`mt-3 flex items-center  justify-between`}>
                    <div>Service Fee</div>
                    <div>2% (to the DAO)</div>
                </div>
                <div className={`mt-3 flex items-center justify-between`}>
                    <div>Taxes</div>
                    <div>Included</div>
                </div>
                <div className={`mt-4 flex items-center justify-between font-bold`}>
                    <div>Total</div>
                    <div>{totalPrice} GHO</div>
                </div>
            </div>
            <div className="w-full">
                <div
                    onClick={() => createOrder(JSON.stringify(order), totalPrice.toString())}
                    className="mt-12 flex items-center justify-center rounded-3xl bg-[#FF914D] px-6 py-4 text-lg font-semibold text-black"
                >
                    <div className="">Start Order</div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

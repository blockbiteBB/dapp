"use client";

import { useModal } from "@/contexts/ModalContext";
import { useEffect } from "react";

const MobileModal = () => {
    const [{ mobileModalOpen, content }, dispatch] = useModal();

    useEffect(() => {
        if (mobileModalOpen) {
            document.body.classList.add("overflow-hidden");
            setTimeout(() => {
                dispatch({ type: "CLOSE_MOBILE_MODAL" });
            }, 5000);
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [mobileModalOpen]);

    if (!mobileModalOpen) return;

    return (
        <div
            className={`absolute bottom-0 left-0 z-10 w-full transform rounded-t-2xl bg-white p-5 py-10 shadow-custom-shadow transition-all duration-300 ${
                mobileModalOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
        >
            {content}
        </div>
    );
};

export default MobileModal;

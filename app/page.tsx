"use client";

import { useState, useEffect } from "react";
import { Connected } from "@/components/Connected";
import Main from "@/components/Dashboard/Main";
import MembershipModal from "@/components/Membership/MembershipModal";
import { useUser } from "@/contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Home = () => {
    const [{ membershipId, isWhitelisted, didApply }] = useUser();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (membershipId === null) return;
        if (membershipId === "0") setShowModal(true);
    }, [membershipId]);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="px-5 md:px-11 xl:px-32">
                <Main />
                <Connected>
                    <MembershipModal isOpen={showModal} setShowModal={setShowModal} isWhitelisted={isWhitelisted} didApply={didApply} />
                </Connected>
            </div>
        </QueryClientProvider>
    );
};

export default Home;

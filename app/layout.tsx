import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { chillaxFont, montserratFont, sourceCodeProFont } from "./utils/constants/font";
import { Providers } from "./Providers";
import RestaurantContextProvider from "@/contexts/RestaurantContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserContextProvider from "@/contexts/UserContext";
import ContractContextProvider from "@/contexts/ContractContext";
import ModalContextProvider from "@/contexts/ModalContext";
import MobileModal from "@/components/_shared/MobileModal";

export const metadata: Metadata = {
    title: "EtherEats Dapp",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${chillaxFont.variable} ${montserratFont.variable} ${sourceCodeProFont.variable}`}>
            <body className="bg-white text-brand-app-black">
                <Providers>
                    <ModalContextProvider>
                        <RestaurantContextProvider>
                            <UserContextProvider>
                                <ContractContextProvider>
                                    <Navbar />
                                    {children}
                                    <Footer />
                                    <MobileModal />
                                </ContractContextProvider>
                            </UserContextProvider>
                        </RestaurantContextProvider>
                    </ModalContextProvider>
                </Providers>
            </body>
        </html>
    );
}

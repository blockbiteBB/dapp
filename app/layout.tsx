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

export const metadata: Metadata = {
    title: "BlockBite Dapp",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${chillaxFont.variable} ${montserratFont.variable} ${sourceCodeProFont.variable}`}>
            <body className="bg-white text-brand-app-black">
                <Providers>
                    <RestaurantContextProvider>
                        <UserContextProvider>
                            <ContractContextProvider>
                                <Navbar />
                                {children}
                                <Footer />
                            </ContractContextProvider>
                        </UserContextProvider>
                    </RestaurantContextProvider>
                </Providers>
            </body>
        </html>
    );
}

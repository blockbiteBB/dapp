"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { WagmiConfig } from "wagmi";
import { chains, config } from "../wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect;
    return (
        <WagmiConfig config={config}>
            <RainbowKitProvider theme={darkTheme()} chains={chains}>
                <QueryClientProvider client={queryClient}>{mounted && children}</QueryClientProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

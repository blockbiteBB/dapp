import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const walletConnectProjectId = "a68567a607196788d786b44f5aebdd07";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai, ...(process.env.NODE_ENV === "development" ? [polygonMumbai] : [])],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "stayaround - dev",
    chains,
    projectId: walletConnectProjectId,
});

export const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export { chains };

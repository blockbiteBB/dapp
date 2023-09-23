import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                chillax: ["var(--font-chillax)"],
                montserrat: ["var(--font-montserrat)"],
                sourceCodePro: ["var(--font-source-code-pro)"],
            },
            backgroundImage: {
                btn: "linear-gradient(180deg, #FFDB58 0%, #FF914D 100%)",
            },
            boxShadow: {
                "custom-shadow": "0px 4px 25px 0px rgba(0, 0, 0, 0.25)",
            },
            colors: {
                brand: {
                    "app-orange": "#FF914D",
                    black: "#121212",
                    "app-gray": "#B3B3B3",
                    "app-black": "#121212",
                },
            },
        },
    },
    plugins: [],
};
export default config;

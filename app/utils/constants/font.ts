import localFont from "next/font/local";

export const chillaxFont = localFont({
    src: [
        {
            path: "../../../public/fonts/chillax/Chillax-Extralight.otf",
            weight: "300",
            style: "extralight",
        },
        {
            path: "../../../public/fonts/chillax/Chillax-Light.otf",
            weight: "400",
            style: "light",
        },
        {
            path: "../../../public/fonts/chillax/Chillax-Regular.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../../public/fonts/chillax/Chillax-Medium.otf",
            weight: "600",
            style: "medium",
        },
        {
            path: "../../../public/fonts/chillax/Chillax-Bold.otf",
            weight: "700",
            style: "bold",
        },
    ],
    variable: "--font-chillax",
});

export const montserratFont = localFont({
    src: [
        {
            path: "../../../public/fonts/montserrat/Montserrat-ExtraLight.ttf",
            weight: "200",
            style: "extralight",
        },
        {
            path: "../../../public/fonts/montserrat/Montserrat-Light.ttf",
            weight: "300",
            style: "light",
        },
        {
            path: "../../../public/fonts/montserrat/Montserrat-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../../public/fonts/montserrat/Montserrat-Medium.ttf",
            weight: "500",
            style: "medium",
        },
        {
            path: "../../../public/fonts/montserrat/Montserrat-SemiBold.ttf",
            weight: "600",
            style: "semibold",
        },
        {
            path: "../../../public/fonts/montserrat/Montserrat-Bold.ttf",
            weight: "700",
            style: "bold",
        },
    ],
    variable: "--font-montserrat",
});

export const sourceCodeProFont = localFont({
    src: [
        {
            path: "../../../public/fonts/source-code-pro/SourceCodePro-ExtraLight.ttf",
            weight: "200",
            style: "extralight",
        },
        {
            path: "../../../public/fonts/source-code-pro/SourceCodePro-Light.ttf",
            weight: "300",
            style: "light",
        },
        {
            path: "../../../public/fonts/source-code-pro/SourceCodePro-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../../public/fonts/source-code-pro/SourceCodePro-Medium.ttf",
            weight: "500",
            style: "medium",
        },
        {
            path: "../../../public/fonts/source-code-pro/SourceCodePro-SemiBold.ttf",
            weight: "600",
            style: "semibold",
        },
        {
            path: "../../../public/fonts/source-code-pro/SourceCodePro-Bold.ttf",
            weight: "700",
            style: "bold",
        },
    ],
    variable: "--font-source-code-pro",
});

const brown = {
    400: "#ac8e6c",
    500: "#8c6d5c",
    600: "#6c4d4c",
    700: "#4c2d3c",
    800: "#2c230d",
} as const;

export const Colors = {
    green: "#539565",
    brown,

    beige: {
        200: "var(--color-beige-200)",
        300: "var(--color-beige-300)",
        400: "var(--color-beige-400)",
        500: "var(--color-beige-500)",
    },

    primary: brown,

    dialog: {
        backgroundColor: "#FFF8F3",
    },
} as const;

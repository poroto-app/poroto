const brown = {
    400: "#ac8e6c",
    500: "#8c6d5c",
    600: "#6c4d4c",
    700: "#4c2d3c",
    800: "#2c230d",
} as const;

const beige = {
    200: "#f7f5ee",
    300: "#d8bfc5",
    400: "#bba0a6",
    500: "#958797",
} as const;

export const Colors = {
    green: "#539565",
    brown,
    beige,

    primary: brown,

    dialog: {
        backgroundColor: "#FFF8F3",
    },
} as const;

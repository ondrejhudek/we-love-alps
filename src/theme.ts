import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading:
      'Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: 'Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  colors: {
    primary: {
      50: "#dbfbff",
      100: "#afedff",
      200: "#80e0ff",
      300: "#52d3fe",
      400: "#2ec7fd",
      500: "#1fade4",
      600: "#0f87b2",
      700: "#006080",
      800: "#003a4f",
      900: "#00141f",
    },
    secondary: {
      50: "#d9fbff",
      100: "#adeeff",
      200: "#7de1ff",
      300: "#4dd5ff",
      400: "#25c8fe",
      500: "#14afe5",
      600: "#0088b3",
      700: "#006181",
      800: "#003b50",
      900: "#001520",
    },
    tertiary: {
      50: "#e8f6f8",
      100: "#d0dee2",
      200: "#b4c6cc",
      300: "#96b0b7",
      400: "#799aa4",
      500: "#60808a",
      600: "#4a646c",
      700: "#34474d",
      800: "#1d2b2f",
      900: "#030f14",
    },
  },
  transition: {
    primary: "all 0.2s ease-in-out 0s",
  },
});

export default theme;

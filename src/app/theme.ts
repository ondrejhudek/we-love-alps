import { extendTheme } from "@chakra-ui/react";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { mode } from "@chakra-ui/theme-tools";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const colors = {
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
  instagram: {
    50: "#ffe5f0",
    100: "#fabad1",
    200: "#f18fb0",
    300: "#e96290",
    400: "#e23771",
    500: "#c81d57",
    600: "#9d1544",
    700: "#710c30",
    800: "#46051d",
    900: "#1d000b",
  },
};

const almostFull = definePartsStyle({
  dialog: defineStyle({
    minH: "90dvh",
    w: "90vw",
    borderRadius: "md",
  }),
  dialogContainer: defineStyle({
    alignItems: "center",
  }),
});

const Modal = defineMultiStyleConfig({
  variants: { almostFull },
});

const transition = {
  primary: "all 0.2s ease-in-out 0s",
};

const theme = extendTheme({
  breakpoints: {
    xs: "22em",
  },
  fonts: {
    heading:
      'var(--font-ubuntu), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: 'var(--font-ubuntu), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  colors,
  components: { Modal },
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body": {
        color: mode("gray.700", "whiteAlpha.900")(props),
      },
      body: {
        bgColor: mode("gray.100", "gray.800")(props),
      },
      h1: {
        color: mode("primary.700", "primary.500")(props),
      },
      "h2, h3, h4, h5, h6": {
        color: mode("gray.700", "gray.300")(props),
      },
    }),
  },
  transition,
});

export default theme;

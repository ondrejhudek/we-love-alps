import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const {
  definePartsStyle: tableDefinePartsStyle,
  defineMultiStyleConfig: tableDefineMultiStyleConfig,
} = createMultiStyleConfigHelpers(tableAnatomy.keys);

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
  facebook: {
    50: "#dff2ff",
    100: "#b3d4ff",
    200: "#83b8fb",
    300: "#549cf6",
    400: "#267ff3",
    500: "#0c66d9",
    600: "#044faa",
    700: "#00387b",
    800: "#00224c",
    900: "#000c1f",
  },
};

const transition = {
  primary: "all 0.2s ease-in-out 0s",
};

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const tableVariantStripe = tableDefinePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    th: {
      borderWidth: 0,
    },
    td: {
      borderColor: "transparent",
    },
    tbody: {
      td: {
        "&:first-of-type": {
          borderLeftRadius: 8,
        },
        "&:last-of-type": {
          borderRightRadius: 8,
        },
      },
      tr: {
        borderRadius: 8,

        "&:nth-of-type(odd)": {
          "th, td": {
            borderColor: "transparent",
          },
          td: {
            background: mode(`${c}.50`, `${c}.800`)(props),
          },
        },
      },
    },
  };
});

export const tableTheme = tableDefineMultiStyleConfig({
  variants: {
    striped: tableVariantStripe,
  },
});

const theme = extendTheme({
  breakpoints: {
    xs: "22em",
    lg2: "68em",
  },
  colors,
  config,
  components: { Table: tableTheme },
  fonts: {
    heading:
      'var(--font-ubuntu), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: 'var(--font-ubuntu), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  sizes: {
    container: {
      "2xl": "1440px",
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body": {
        color: mode("gray.700", "whiteAlpha.900")(props),
      },
      body: {
        bgColor: mode("gray.100", "secondary.900")(props),
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

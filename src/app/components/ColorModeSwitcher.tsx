import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("tmavý", "světlý");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const bgColor = useColorModeValue("secondary.700", "secondary.600");
  const hoverBgColor = useColorModeValue("secondary.600", "secondary.700");

  return (
    <Box ml={2} bgColor={bgColor} borderRadius="full">
      <Box
        p={6}
        color="gray.100"
        borderRadius="full"
        transition="background-position 0.1s ease"
        bgGradient={`linear(to-t, ${hoverBgColor} 50%, transparent 50%)`}
        bgSize="100% 200%"
        bgPosition="0 0"
        cursor="pointer"
        aria-label={`Přepnout na ${text} mód`}
        _hover={{
          textDecoration: "none",
          color: "white",
          bgPosition: "0 100%",
        }}
        onClick={toggleColorMode}
      >
        <SwitchIcon />
      </Box>
    </Box>
  );
};

export default ColorModeSwitcher;

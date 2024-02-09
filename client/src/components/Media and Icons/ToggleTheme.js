import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, useColorMode } from "@chakra-ui/react"

export const ToggleTheme = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="flex-end"
    >
      {colorMode === "dark"
        ? <SunIcon cursor="pointer" onClick={toggleColorMode} />
        : <MoonIcon cursor="pointer" onClick={toggleColorMode} />
      }
    </Box>
  )
}

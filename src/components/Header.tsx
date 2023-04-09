import {
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  Heading,
  Container,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { motion } from "framer-motion";
import { navVariants } from "utils/motion";

import Link from "next/link";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [isConnected, setIsConnected] = useState(false);

  const handleSignIn = () => {
    setIsConnected(!isConnected);
  };

  return (
    <Container p={2} maxW={"6xl"} textAlign="center">
      <Flex
        as={motion.div}
        variants={navVariants}
        initial="hidden"
        whileInView={"show"}
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link href={"/"}>
          <Heading>Goyoogle Image</Heading>
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;

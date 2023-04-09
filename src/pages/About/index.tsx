import { type NextPage } from "next";
import Head from "next/head";

import {
  Divider,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import Header from "components/Header";
import Footer from "components/Footer";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="Goyo - About" content="About section of your shop !" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        direction="column"
        minH={"calc(100vh)"}
        bgGradient={useColorModeValue(
          "linear(to-b, gray.300, gray.100, gray.300)",
          "linear(to-b, gray.900, gray.700, gray.900)"
        )}
      >
        <Header />
        <Divider w={"xl"} mx="auto" />
        <Spacer />
        <Heading justifyContent={"center"} display="flex" textAlign={"center"}>
          You can put any description about you & your product in this page !
        </Heading>
        <Spacer />
        <Divider w={"xl"} mx="auto" />
        <Footer />
      </Flex>
    </>
  );
};

export default About;

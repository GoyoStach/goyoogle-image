import { type NextPage } from "next";
import Head from "next/head";

import { Flex, Spacer, useColorModeValue } from "@chakra-ui/react";
import Header from "components/Header";
import Masthead from "components/Masthead";
import Footer from "components/Footer";
import Response from "components/Response";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Goyo-Shop</title>
        <meta
          name="Goyo-Shop"
          content="New application using goyo-boilerplate"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        direction="column"
        minH={"calc(100vh)"}
        bgGradient={useColorModeValue(
          "linear(to-b, gray.300, gray.100, gray.300)",
          "linear(to-b, gray.900, gray.700, gray.900)"
        )}
        overflow={"hidden"}
      >
        <Header />
        <Masthead />
        <Response />
        <Spacer />
        <Footer />
      </Flex>
    </>
  );
};

export default Home;

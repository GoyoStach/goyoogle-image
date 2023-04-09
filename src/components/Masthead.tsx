import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { slideIn, zoomIn } from "utils/motion";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const Masthead = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateDB = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/createdatabase");
      console.log(data);
    } catch (error: any) {
      console.log(error.reponse.data);
    }
    setIsLoading(false);
  };

  const handlePopulateDB = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/populatedatabase");
      console.log(data);
    } catch (error: any) {
      console.log(error.reponse.data);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"6xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 2 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            initial="hidden"
            as={motion.div}
            variants={zoomIn("0", "2")}
            whileInView={"show"}
          >
            Image searching
            <br />
            <Text as={"span"} color={"green.400"}>
              Powered by AI !
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            This is a small tool created to understand how vectorial database
            works. Follow the readMe documentation in order to understand how to
            use the website correctly. <br />
            Enjoy !
          </Text>
          <Heading fontSize={"xl"}>First Initialisation :</Heading>
          <Stack direction="row" display="flex" justifyContent={"space-evenly"}>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
              initial="hidden"
              as={motion.div}
              variants={slideIn("left", "Inertia", "0", "2")}
              whileInView={"show"}
            >
              <Heading fontSize={"lg"}>Step 1: </Heading>
              <Button
                onClick={() => handleCreateDB()}
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Create Model
              </Button>
            </Stack>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
              initial="hidden"
              as={motion.div}
              variants={slideIn("right", "Inertia", "0", "2")}
              whileInView={"show"}
            >
              <Heading fontSize={"lg"}>Step 2 :</Heading>
              <Button
                colorScheme={"blue"}
                bg={"blue.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => handlePopulateDB()}
              >
                Populate Database
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      {isLoading ? (
        <Alert status="loading" justifyContent={"center"}>
          <AlertIcon />
          <AlertTitle>Operation are in progress on the database !</AlertTitle>
          <AlertDescription>
            Please wait before doing any other tasks .
          </AlertDescription>
        </Alert>
      ) : null}
    </>
  );
};

export default Masthead;

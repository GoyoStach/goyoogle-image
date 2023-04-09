import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Button,
  Stack,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Input,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { zoomIn } from "utils/motion";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const Response = () => {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedImage, setFocusedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickImage = (src: string) => {
    setFocusedImage(src);
    onOpen();
  };

  const onChangeImage = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleCompare = async () => {
    setIsLoading(true);
    try {
      if (!file) return;
      const formData = new FormData();

      formData.append("myImage", file);
      const { data } = await axios.post("/api/compare", formData);
      setData(data);
    } catch (error: any) {}
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
          padding={10}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Heading>
            Put below the image you want to compare to the database
          </Heading>
          <Input
            backgroundColor={"gray.600"}
            size="lg"
            type="file"
            variant="unstyled"
            width={"fit-content"}
            onChange={onChangeImage}
            padding={2}
          />
          <Button onClick={() => handleCompare()} disabled={!file}>
            Lauch request !
          </Button>
          <p>
            By default, all new images are stored to database. You can disable
            this option In the backend code.
          </p>
        </Stack>
        {data ? (
          <>
            <Grid templateColumns={"repeat(3, 1fr)"} rowGap={4} columnGap={2}>
              <GridItem
                colSpan={3}
                justifyItems="center"
                alignItems={"center"}
                justifyContent={"center"}
                display="flex"
              >
                <Heading size={"sm"}>Your image :</Heading>
              </GridItem>
              <GridItem
                colSpan={3}
                justifyItems="center"
                alignItems={"center"}
                justifyContent={"center"}
                display="flex"
                as={motion.div}
                variants={zoomIn(0.1, 1)}
                initial="hidden"
                whileInView={"show"}
              >
                <Image
                  src={`/img/${data.baseImg}`}
                  width={500}
                  height={500}
                  alt={data.baseImg}
                  style={{ objectFit: "cover", borderRadius: "30px" }}
                />
              </GridItem>
              <GridItem colSpan={3} display="flex" justifyContent={"center"}>
                <Heading as={"h2"} textAlign={"center"}>
                  Best Result :
                </Heading>
              </GridItem>
              <GridItem
                colSpan={3}
                justifyContent={"center"}
                display="flex"
                as={motion.div}
                variants={zoomIn(0.1, 1)}
                initial="hidden"
                whileInView={"show"}
              >
                <Image
                  src={`/img/${data.data[0]}`}
                  width={500}
                  height={500}
                  alt={data.data[0]}
                  style={{ objectFit: "cover", borderRadius: "30px" }}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <Heading as={"h2"}>Other results :</Heading>
              </GridItem>
              {data.data.map((item, index) => {
                if (index === 0) {
                  return;
                }
                return (
                  <GridItem
                    colSpan={1}
                    justifyItems="center"
                    alignItems={"center"}
                    display="flex"
                    as={motion.div}
                    variants={zoomIn(index * 0.1, 1)}
                    initial="hidden"
                    whileInView={"show"}
                    key={item}
                    onClick={() => handleClickImage(`/img/${item}`)}
                  >
                    <Image
                      src={`/img/${item}`}
                      width={500}
                      height={500}
                      alt={item}
                      style={{
                        objectFit: "cover",
                        borderRadius: "30px",
                      }}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          </>
        ) : null}
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
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{focusedImage}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} justifyContent={"center"}>
            <Image
              src={focusedImage}
              width={800}
              height={800}
              alt={focusedImage}
              style={{ objectFit: "cover", borderRadius: "30px" }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Response;

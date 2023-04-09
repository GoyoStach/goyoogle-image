import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import theme from "../styles/theme";

const MyApp: AppType<{}> = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;

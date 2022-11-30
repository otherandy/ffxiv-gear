import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

import MyHeader from '../components/header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MyHeader />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

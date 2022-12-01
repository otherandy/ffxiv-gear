import Link from 'next/link';
import { Flex, Heading, Spacer } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

const Header = () => {
  return (
    <Flex as="header" bg="gray.900" w="100%" p={4} mb={4} color="white">
      <Link href="/">
        <Heading as="h1" size="lg">
          FFXIV
        </Heading>
      </Link>
      <Spacer />
      <Link href="/options">
        <SettingsIcon boxSize={7} />
      </Link>
    </Flex>
  );
};

export default Header;

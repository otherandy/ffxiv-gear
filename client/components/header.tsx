import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, Heading, Spacer } from '@chakra-ui/react';
import Link from 'next/link';

const Header = () => {
  return (
    <Flex as="header" bg="gray.900" w="100%" p={4} mb={4} color="white">
      <Link href="/">
        <Heading as="h1" size="lg">
          FFXIV
        </Heading>
      </Link>
      <Spacer />
      {/* <AvatarGroup size="sm" max={1}>
        <Avatar />
        <Avatar />
      </AvatarGroup> */}
      <Link href="/options">
        <SettingsIcon boxSize={6} mt={2}/>
      </Link>
    </Flex>
  );
};

export default Header;

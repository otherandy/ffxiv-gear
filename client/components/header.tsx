import { useEffect, useState } from 'react';

import Link from 'next/link';
import {
  Avatar,
  AvatarGroup,
  Flex,
  Heading,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import useSocket from '../hooks/socket';

const Header = () => {
  const socket = useSocket();
  const [clients, setClients] = useState(0);

  useEffect(() => {
    socket.on('clients', (clients) => {
      setClients(clients);
    });
  }, []);

  return (
    <Flex as="header" bg="gray.900" w="100%" p={4} mb={4} color="white">
      <Link href="/">
        <Heading as="h1" size="lg">
          FFXIV
        </Heading>
      </Link>
      <Spacer />
      <HStack>
        <AvatarGroup size="sm" max={1} textColor="gray.600" spacing="-2">
          {Array.apply(0, Array(clients + 1)).map((_, i) => {
            return <Avatar key={i} />;
          })}
        </AvatarGroup>
        <Link href="/options">
          <SettingsIcon boxSize={7} />
        </Link>
      </HStack>
    </Flex>
  );
};

export default Header;

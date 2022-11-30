import { useState } from 'react';
import axios from 'axios';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  useToast,
} from '@chakra-ui/react';

export default function Options() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createCharacter = (toast: any) => {
    setIsLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/characters`)
      .then(() => {
        toast({
          title: 'Character created.',
          status: 'success',
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Error creating character.',
          status: 'error',
          isClosable: true,
        });
      });
    setIsLoading(false);
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading>Options</Heading>
        </CardHeader>
        <CardBody>
          <Button
            colorScheme="blue"
            onClick={(_) => {
              createCharacter(toast);
            }}
            isLoading={isLoading}
          >
            Create New Character
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
}

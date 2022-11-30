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

const createCharacter = (toast: any) => {
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/`)
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
};

const Options = () => {
  const toast = useToast();
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
          >
            Create New Character
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Options;

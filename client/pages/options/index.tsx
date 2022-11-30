import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
} from '@chakra-ui/react';

const createCharacter = () => {
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/`, {
    name: 'New Character',
    job: 'PLD',
    gearset: 'https://etro.gg/',
  });
};

const Options = () => {
  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading>Options</Heading>
        </CardHeader>
        <CardBody>
          <Button colorScheme="blue" onClick={createCharacter}>
            Create New Character
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Options;

import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Character } from '../../interfaces';
import axios from 'axios';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export const getServerSideProps: GetServerSideProps<{
  data: Character;
}> = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${context.query.id}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default function Edit({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [character, setCharacter] = useState<Character>(data);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      currentTarget: {
        name: { value: name },
        role: { value: role },
        gearset: { value: gearset },
      },
    } = e;

    const data = {
      name,
      role,
      gearset,
    };

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${character.id}`,
        data
      )
      .then(() => {
        toast({
          title: 'Character updated.',
          status: 'success',
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Error updating character.',
          status: 'error',
          isClosable: true,
        });
      });
    setIsLoading(false);
  };

  const handleDelete = async () => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${character.id}`
      )
      .then(() => {
        toast({
          title: 'Character deleted.',
          status: 'success',
          isClosable: true,
        });
        router.push('/');
      })
      .catch(() => {
        toast({
          title: 'Error deleting character.',
          status: 'error',
          isClosable: true,
        });
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
  };

  return (
    <Container>
      <Card align="center">
        <CardHeader>
          <Heading as="h1" size="4xl">
            {character.name}
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                defaultValue={character.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select name="role" defaultValue={character.role}>
                <option value="Tank">Tank</option>
                <option value="Healer">Healer</option>
                <option value="DPS">DPS</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Gearset</FormLabel>
              <Input name="gearset" defaultValue={character.gearset} />
              <FormHelperText>Please use an etro link.</FormHelperText>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              mt={4}
              isLoading={isLoading}
            >
              Update
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <Button variant="link" onClick={onOpen}>
            <DeleteIcon boxSize={6} color="red.500" />
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

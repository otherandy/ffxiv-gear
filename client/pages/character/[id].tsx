import { useRouter } from 'next/router';
import { FC } from 'react';
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';

type Props = {
  characters: Character[];
};

const Character: FC<Props> = ({ characters }) => {
  const router = useRouter();
  const { id } = router.query;
  const index = characters.findIndex((c) => c.id === id);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      currentTarget: {
        job: { value: job },
        gearset: { value: gearset },
      },
    } = e;

    const data = {
      job,
      gearset,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/${id}`, data)
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
  };

  const handleDelete = async () => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${characters[index].id}`
      )
      .then(() => {
        toast({
          title: 'Character deleted.',
          status: 'success',
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Error deleting character.',
          status: 'error',
          isClosable: true,
        });
      });
  };

  return (
    <Container>
      <Card align="center">
        <CardHeader>
          <Heading as="h1" size="4xl">
            {characters[index].name}
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Job</FormLabel>
              <Input
                name="job"
                maxLength={3}
                defaultValue={characters[index].job}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Gearset</FormLabel>
              <Input name="gearset" defaultValue={characters[index].gearset} />
              <FormHelperText>Please use an etro link.</FormHelperText>
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>
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
            <Link href="/" onClick={handleDelete}>
              <Button variant="ghost" colorScheme="red">
                Delete
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Character;

import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ChangeEvent, useState } from 'react';
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
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { characterColor } from '../../styles/colors';

export const getServerSideProps: GetServerSideProps<{
  data: Character;
}> = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/characters/${context.query.id}`
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
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState<Character>(data);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const ModalContentDelete = () => (
    <ModalContent>
      <ModalHeader>Delete Character</ModalHeader>
      <ModalCloseButton />
      <ModalBody>Are you sure? This cannot be undone.</ModalBody>
      <ModalFooter>
        <Button
          colorScheme="blue"
          mr={3}
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          colorScheme="red"
          onClick={handleDelete}
          isLoading={isLoading}
        >
          Delete
        </Button>
      </ModalFooter>
    </ModalContent>
  );

  const ModalContentUpdate = () => (
    <ModalContent>
      <ModalHeader>Update Gearset</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        Are you sure? This will overwrite your current data.
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="blue"
          mr={3}
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          colorScheme="orange"
          onClick={handleUpdate}
          isLoading={isLoading}
        >
          Overwrite
        </Button>
      </ModalFooter>
    </ModalContent>
  );

  const [content, setContent] = useState(<ModalContentDelete />);

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
        `${process.env.NEXT_PUBLIC_API_URL}/characters/${character.id}`,
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
    setIsLoading(true);
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/characters/${character.id}`)
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
    setIsLoading(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/etro/${character.id}`, {
        url: character.gearset,
      })
      .then((res) => {
        if (res.status === 200) {
          const { name, jobAbbrev, patch } = res.data;
          toast({
            title: 'Character updated.',
            description: `Filled needs with ${name} for ${jobAbbrev} [Patch ${patch}].`,
            status: 'success',
            isClosable: true,
          });
        }
        if (res.status === 400) {
          toast({
            title: 'Error updating character.',
            description: res.data.message,
            status: 'error',
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Server error.',
          description: err.response.data.message,
          status: 'error',
          isClosable: true,
        });
      })
      .finally(onClose);
    setIsLoading(false);
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
              <Select
                name="role"
                defaultValue={character.role}
                borderColor={characterColor(character)}
                onChange={handleChange}
              >
                <option value="Tank">Tank</option>
                <option value="Healer">Healer</option>
                <option value="DPS">DPS</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Gearset</FormLabel>
              <HStack>
                <Input
                  name="gearset"
                  defaultValue={character.gearset}
                  onChange={handleChange}
                />
                <Tooltip label="Update Gearset" aria-label="Update gearset">
                  <Button
                    onClick={() => {
                      setContent(<ModalContentUpdate />);
                      onOpen();
                    }}
                  >
                    <RepeatIcon boxSize={6} />
                  </Button>
                </Tooltip>
              </HStack>
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
          <Button
            variant="link"
            onClick={() => {
              setContent(<ModalContentDelete />);
              onOpen();
            }}
          >
            <DeleteIcon boxSize={6} color="red.500" />
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {content}
      </Modal>
    </Container>
  );
}

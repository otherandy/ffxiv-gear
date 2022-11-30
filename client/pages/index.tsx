import { FC } from 'react';
import { Character } from '../interfaces';
import axios from 'axios';

import Link from 'next/link';
import {
  HStack,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

type Props = {
  characters: Character[];
};

const Home: FC<Props> = ({ characters }) => {
  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const id = characters[index].id;
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/${id}`, {
        [name]: value,
      })
      .catch((err) => console.log(err));
  };

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Th>Name</Th>
          <Th>Turn 1</Th>
          <Th>Turn 2</Th>
          <Th>Turn 3</Th>
          <Th>Turn 4</Th>
          <Th>Edit</Th>
        </Thead>
        <Tbody>
          {characters.map((character, index) => (
            <Tr>
              <Td>
                <Input
                  name="name"
                  defaultValue={character.name}
                  onChange={(e) => handleChange(e.nativeEvent, index)}
                  width="auto"
                />
              </Td>
              <Td>
                <HStack>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                </HStack>
              </Td>
              <Td>
                <HStack>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                </HStack>
              </Td>
              <Td>
                <HStack>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                </HStack>
              </Td>
              <Td>
                <HStack>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                  <Select size="xs">
                    <option value="Don't need">Don't need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                  </Select>
                </HStack>
              </Td>
              <Td>
                <Link
                  href={{
                    pathname: '/character/[id]',
                    query: { id: character.id },
                  }}
                >
                  <EditIcon boxSize={6} color="blue.500" />
                </Link>
                &nbsp; &nbsp;
                <a
                  href=""
                  onClick={() => {
                    axios.delete(
                      `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${character.id}`
                    );
                  }}
                >
                  <DeleteIcon boxSize={6} color="red.500" />
                </a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Home;

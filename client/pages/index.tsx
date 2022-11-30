import { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Character } from '../interfaces';
import { getColorScheme } from '../utils/character';
import { getColor } from '../utils/needs';
import axios from 'axios';
import io from 'socket.io-client';

import Link from 'next/link';
import {
  HStack,
  Select,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';

const socket = io(process.env.NEXT_PUBLIC_API_URL!);

export const getServerSideProps: GetServerSideProps<{
  data: Character[];
}> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/characters`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [characters, setCharacters] = useState<Character[]>(data);

  useEffect(() => {
    socket.on('insert', (character: Character) => {
      setCharacters((characters) => [...characters, character]);
    });

    socket.on('update', (character: Character) => {
      setCharacters((characters) => {
        const index = characters.findIndex((c) => c.id === character.id);
        characters[index] = character;
        return [...characters];
      });
    });

    socket.on('delete', (id: string) => {
      setCharacters((characters) => characters.filter((c) => c.id !== id));
    });

    return () => {
      socket.off('insert');
      socket.off('update');
      socket.off('delete');
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    const id = characters[index].id;
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/${id}`, {
        [name]: value,
      })
      .catch((err) => console.error(err));
  };

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th colSpan={4}>Turn 1</Th>
            <Th colSpan={5}>Turn 2</Th>
            <Th colSpan={5}>Turn 3</Th>
            <Th colSpan={2}>Turn 4</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td>Bracelet</Td>
            <Td>Earrings</Td>
            <Td>Necklace</Td>
            <Td>Rings</Td>
            <Td>Boots</Td>
            <Td>Gloves</Td>
            <Td>Hat</Td>
            <Td>Acc. Up.</Td>
            <Td>Tome Weap.</Td>
            <Td>Boots</Td>
            <Td>Legs</Td>
            <Td>Hat</Td>
            <Td>Armor Up.</Td>
            <Td>Weapon Up.</Td>
            <Td>Chest</Td>
            <Td>Weapon</Td>
            <Td></Td>
          </Tr>
          {characters.map((character, index) => (
            <Tr key={character.id}>
              <Td>
                <Tag colorScheme={getColorScheme(character)}>
                  {character.name}
                </Tag>
              </Td>
              <Td colSpan={4}>
                <HStack>
                  <Select
                    name="bracelet"
                    variant="unstyled"
                    bg={getColor(character.bracelet)}
                    value={character.bracelet}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="earrings"
                    variant="unstyled"
                    bg={getColor(character.earrings)}
                    value={character.earrings}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="necklace"
                    variant="unstyled"
                    bg={getColor(character.necklace)}
                    value={character.necklace}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="rings"
                    variant="unstyled"
                    bg={getColor(character.rings)}
                    value={character.rings}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                </HStack>
              </Td>
              <Td colSpan={5}>
                <HStack>
                  <Select
                    name="boots"
                    variant="unstyled"
                    bg={getColor(character.boots)}
                    value={character.boots}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="gloves"
                    variant="unstyled"
                    bg={getColor(character.gloves)}
                    value={character.gloves}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="hat"
                    variant="unstyled"
                    bg={getColor(character.hat)}
                    value={character.hat}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="accessoryUpgrade"
                    variant="unstyled"
                    bg={getColor(character.accessoryUpgrade)}
                    value={character.accessoryUpgrade}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="tomeWeapon"
                    variant="unstyled"
                    bg={getColor(character.tomeWeapon)}
                    value={character.tomeWeapon}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                </HStack>
              </Td>
              <Td colSpan={5}>
                <HStack>
                  <Select
                    name="boots"
                    variant="unstyled"
                    bg={getColor(character.boots)}
                    value={character.boots}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="legs"
                    variant="unstyled"
                    bg={getColor(character.legs)}
                    value={character.legs}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="hat"
                    variant="unstyled"
                    bg={getColor(character.hat)}
                    value={character.hat}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="armorUpgrade"
                    variant="unstyled"
                    bg={getColor(character.armorUpgrade)}
                    value={character.armorUpgrade}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="weaponUpgrade"
                    variant="unstyled"
                    bg={getColor(character.weaponUpgrade)}
                    value={character.weaponUpgrade}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                </HStack>
              </Td>
              <Td colSpan={2}>
                <HStack>
                  <Select
                    name="chest"
                    variant="unstyled"
                    bg={getColor(character.chest)}
                    value={character.chest}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
                  </Select>
                  <Select
                    name="weapon"
                    variant="unstyled"
                    bg={getColor(character.weapon)}
                    value={character.weapon}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Don't need">Don&#39;t need</option>
                    <option value="Need">Need</option>
                    <option value="Have">Have</option>
                    <option value="Need more">Need more</option>
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
                <Link href={character.gearset} target="_blank">
                  <ExternalLinkIcon boxSize={6} />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

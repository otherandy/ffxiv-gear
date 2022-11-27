import { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Character } from '../interfaces';
import axios from 'axios';
import io from 'socket.io-client';

import Link from 'next/link';

const socket = io(process.env.NEXT_PUBLIC_API_URL!);

export const getServerSideProps: GetServerSideProps<{
  data: Character[];
}> = async () => {
  const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/`);

  const data: Character[] = await res.data;

  return {
    props: { data },
  };
};

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [characters, setCharacters] = useState<Character[]>(data);

  useEffect(() => {
    socket.on('update', (data: string) => {
      const updatedCharacters = JSON.parse(data);
      setCharacters(updatedCharacters);
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedCharacters = characters.map((character: Character) => {
      // if (character.id === name) {
      //   return { ...character, [name]: value };
      // }
      return character;
    });
    setCharacters(updatedCharacters);
  };

  const createCharacter = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/characters/`,
      {
        data: {
          name: 'New Character',
          job: 'PLD',
          gearset: 'https://etro.gg/',
        },
      }
    );
    const data = await res.data;
    setCharacters([...characters, data]);
  };

  return (
    <main>
      {characters.map((character: any) => (
        <div key={character.id}>
          <Link href={`/character/${character.id}`}>Edit</Link>
          <input name="name" defaultValue={character.name} />
        </div>
      ))}
      <button onClick={createCharacter}>Create</button>
    </main>
  );
};

export default Home;

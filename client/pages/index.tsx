import { ChangeEvent, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Character } from '../interfaces';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps<{
  data: Character[];
}> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/`);

  const data: Character[] = await res.json();

  return {
    props: { data },
  };
};

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [characters, setCharacters] = useState<Character[]>(data);

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

  const createCharacter = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/characters/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'New Character',
        job: 'PLD',
        gearset: 'https://etro.gg/',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCharacters([...characters, data]);
      });
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

import { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Character } from '../../interfaces';
import io from 'socket.io-client';
// import Script from 'next/script';

const socket = io('http://localhost:4000');

export const getServerSideProps: GetServerSideProps<{
  data: Character;
}> = async (context) => {
  const { id } = context.query;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${id}`
  );

  const data: Character = await res.json();

  return {
    props: { data },
  };
};

const Character = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [character, setCharacter] = useState(data);

  useEffect(() => {
    socket.on('update', (data: string) => {
      const updatedCharacter = JSON.parse(data);
      setCharacter(updatedCharacter);
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedCharacter = { ...character, [name]: value };
    const updatedCharacterString = JSON.stringify(updatedCharacter);
    socket.emit('change', updatedCharacterString);
  };

  return (
    <main>
      {/* <Script src="https://img.finalfantasyxiv.com/lds/pc/global/js/eorzeadb/loader.js?v2" />
      <a
        href="https://na.finalfantasyxiv.com/lodestone/playguide/db/item/e7455d2aa06/"
        className="eorzeadb_link"
      >
        Augmented Cryptlurker's Pendulums
      </a> */}
      <input
        name="name"
        defaultValue={character.name}
        onChange={handleChange}
      />
      <h2>{character.job}</h2>
      <a href={character.gearset} target="_blank">
        Gearset
      </a>
    </main>
  );
};

export default Character;

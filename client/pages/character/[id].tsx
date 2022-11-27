import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
// import Script from 'next/script';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/characters/${id}`
  );

  const data = await res.json();

  return {
    props: { data },
  };
};

export default function Character({ data }: any) {
  const [character, setCharacter] = useState(data);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/characters/${character._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
      }
    ).then((res) => res.json());
  }, [character]);

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
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
      <h1>{character.name}</h1>
      <h2>{character.job}</h2>
      <a href={character.gearset} target="_blank">
        Gearset
      </a>
    </main>
  );
}

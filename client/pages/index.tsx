import { useState } from 'react';
import Link from 'next/link';

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/characters/`
  );

  const data = await res.json();

  return {
    props: { data },
  };
}

export default function Index({ data }: any) {
  const [characters, setCharacters] = useState(data);

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
        <div key={character._id}>
          <Link href={`/character/${character._id}`}>Edit</Link>
          <input name="name" defaultValue={character.name} />
        </div>
      ))}
      <button onClick={createCharacter}>Create</button>
    </main>
  );
}

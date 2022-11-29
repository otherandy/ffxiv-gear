import { ChangeEvent, FC } from 'react';
import { Character } from '../interfaces';
import axios from 'axios';

import Link from 'next/link';

type Props = {
  characters: Character[];
};

const Home: FC<Props> = ({ characters }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const id = characters[index].id;
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/${id}`, {
      [name]: value,
    });
  };

  const createCharacter = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/`, {
      name: 'New Character',
      job: 'PLD',
      gearset: 'https://etro.gg/',
    });
  };

  return (
    <main>
      {characters?.map((character, index) => (
        <div key={character.id}>
          <Link href={`/character/${character.id}`}>Edit</Link>
          <input
            name="name"
            defaultValue={character.name}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <button onClick={createCharacter}>Create</button>
    </main>
  );
};

export default Home;

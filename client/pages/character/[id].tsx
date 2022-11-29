import { useRouter } from 'next/router';
import { FC } from 'react';
import { ChangeEvent } from 'react';
import { Character } from '../../interfaces';
import axios from 'axios';

// import Script from 'next/script';

type Props = {
  characters: Character[];
};

const Character: FC<Props> = ({ characters }) => {
  const router = useRouter();
  const { id } = router.query;
  const index = characters.findIndex((c) => c.id === id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/${id}`, {
      [name]: value,
    });
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
        defaultValue={characters[index].name}
        onChange={handleChange}
      />
      <h2>{characters[index].job}</h2>
      <a href={characters[index].gearset} target="_blank">
        Gearset
      </a>
    </main>
  );
};

export default Character;

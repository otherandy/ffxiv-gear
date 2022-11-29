import '../styles/globals.css';
import App, { AppContext, AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Character } from '../interfaces';
import io from 'socket.io-client';
import axios from 'axios';

type MyProps = {
  data: Character[];
};

const socket = io(process.env.NEXT_PUBLIC_API_URL!);

const MyApp = ({ Component, pageProps, data }: AppProps & MyProps) => {
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

  return (
    <Component
      {...pageProps}
      characters={characters}
      setCharacters={setCharacters}
    />
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = App.getInitialProps(context);

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/characters`
  );
  const data: Character[] = await res.data;

  return {
    ...ctx,
    data,
  };
};

export default MyApp;

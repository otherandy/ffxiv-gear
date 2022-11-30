import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL!);

export default function useSocket() {
  useEffect(() => {
    const cleanup = () => {
      socket.disconnect();
    };

    return cleanup;
  }, []);

  return socket;
}

import { useEffect } from 'react';
import socket from '../socket';

function useSocketEvents(events) {
  useEffect(() => {
    events.map(({ name, handler }) => socket.on(name, handler));

    return () => {
      events.map(({ name, handler }) => socket.off(name, handler));
    };
  }, [events]);
}
export default useSocketEvents;

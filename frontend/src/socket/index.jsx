import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient(process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;

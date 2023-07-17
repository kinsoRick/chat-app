import { useContext } from 'react';
import { SocketContext } from '../socket';

const useSocket = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error('Socket context not found. Make sure you wrap your component with SocketProvider.');
  }

  const addChannel = (serverName, cb) => {
    socket.emit('newChannel', { name: serverName }, (res) => cb(res));
  };

  const renameChannel = (id, name, cb) => {
    socket.emit('renameChannel', { id, name }, (res) => cb(res));
  };

  const removeChannnel = (id, cb) => {
    socket.emit('removeChannel', { id }, (res) => cb(res));
  };

  const sendMessage = (payload) => {
    socket.emit('newMessage', payload);
  };

  const on = (name, handler) => {
    socket.on(name, handler);
  };

  const off = (name) => {
    socket.off(name);
  };

  return {
    addChannel,
    removeChannnel,
    renameChannel,
    sendMessage,
    on,
    off,
  };
};

export default useSocket;

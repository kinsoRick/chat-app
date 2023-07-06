import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173');
const SocketContext = createContext();

export default SocketContext;

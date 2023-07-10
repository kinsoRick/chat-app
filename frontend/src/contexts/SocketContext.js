import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io(import.meta.env.MODE === 'production' ? undefined : 'http://localhost:5173');
const SocketContext = createContext();

export default SocketContext;

import { io } from 'socket.io-client';

const socket = io(import.meta.env.MODE === 'production' ? undefined : 'http://localhost:5173');
export default socket;

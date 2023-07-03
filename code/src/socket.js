import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173';
const socket = io(URL);
socket.connect();

export default socket;

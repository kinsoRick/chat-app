import SocketClientWrapper from './wrapper';

const socket = new SocketClientWrapper(import.meta.env.MODE === 'production' ? undefined : 'http://localhost:5173');
socket.connect();

export default socket;

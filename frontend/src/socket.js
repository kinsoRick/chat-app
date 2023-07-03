import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173';
const socket = io(URL);
// TODO: И лучше создание экземпляра обернуть в контекст/кастомный хук
socket.connect();

export default socket;

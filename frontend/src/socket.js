import { io } from 'socket.io-client';

const socket = io(import.meta.env.MODE === 'production' ? undefined : 'http://localhost:5173');
export default socket;
// Не совсем понимаю почему инстанс создается заново,
// если на сервер в любом случае приходит только 1 запрос. видно по выводу
// + такой код описан в самой документации

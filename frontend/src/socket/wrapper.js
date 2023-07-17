import SocketIOClient from './clientIO';

class SocketClientWrapper extends SocketIOClient {
  addChannel(serverName, cb) {
    this.socket.emit('newChannel', { name: serverName }, (res) => cb(res));
  }

  renameChannel(id, name, cb) {
    this.socket.emit('renameChannel', { id, name }, (res) => cb(res));
  }

  removeChannnel(id, cb) {
    this.socket.emit('removeChannel', { id }, (res) => cb(res));
  }
}

export default SocketClientWrapper;

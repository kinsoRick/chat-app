import { io } from 'socket.io-client';

class SocketIOClient {
  constructor(serverUrl) {
    this.socket = null;
    this.serverUrl = serverUrl;
  }

  connect() {
    this.socket = io.connect(this.serverUrl);
  }

  disconnect() {
    this.socket.disconnect();
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }

  off(event, callback) {
    this.socket.off(event, callback);
  }
}

export default SocketIOClient;

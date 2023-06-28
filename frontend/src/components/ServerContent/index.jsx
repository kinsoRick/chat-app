import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { useSelector } from "react-redux";

import MessageInput from "./MessageInput";
import MessageListener from "./MessageListener";

import AuthContext from "../../contexts/AuthContext";
import socket from '../../socket';


function ServerContent({ currentChannel: { id, name } }) {
  const { t } = useTranslation();

  const { setToken, setUsername, username } = useContext(AuthContext);
  const logout = () => {
    setToken('');
    setUsername('');
  };

  const sendMessage = ({ message }) => {
    if (message === '') return;

    const payload = {
      username,
      body: message,
      channelId: id,
    };
    socket.emit('newMessage', payload);
  };

  const messages = useSelector((state) => state.messages.entities);
  const filteredMessages = Object.values(messages).filter((entity) => entity.channelId === id);

  return (
    <main className="server-content">
      <div className="content-header">
        <div className="main-info">
          <span className="channel-name">{`# ${name}`}</span>
          <span className="channel-messages">{t('message', { count: filteredMessages.length })}</span>
        </div>
        <button type="button" className="ml-auto btn-logout" onClick={logout}>
          {t('logout')}
        </button>
      </div>
      <MessageListener channelId={id} />
      <MessageInput onSubmit={(message) => sendMessage(message)} />
    </main>
  );
}

export default ServerContent;

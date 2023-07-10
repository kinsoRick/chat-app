import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import MessageInput from './MessageInput';
import MessageListener from './MessageListener';

import socket from '../../socket';
import useAuthorization from '../../hooks/useAuthorization';

const ServerContent = ({ currentChannel: { id, name } }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { setToken, setUsername, username } = useAuthorization();
  const logout = () => {
    setToken('');
    setUsername('');
    navigate('/login');
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
};

ServerContent.propTypes = {
  currentChannel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServerContent;

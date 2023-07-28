import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MessageInput from './MessageInput';
import MessageListener from './MessageListener';

import useAuthorization from '../../hooks/useAuthorization';
import useSocket from '../../hooks/useSocket';

import { actions as channelsActions } from '../../store/channelsSlice';

const ServerContent = ({ currentChannel: { id, name } }) => {
  const { t } = useTranslation();
  const { sendMessage } = useSocket();
  const dispatch = useDispatch();

  const { username } = useAuthorization();

  // Костыль
  const logout = () => dispatch(channelsActions.setStatus('logout'));

  const handleMessage = ({ message }) => {
    if (message === '') return;

    const payload = {
      username,
      body: message,
      channelId: id,
    };
    sendMessage(payload);
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
      <MessageInput onSubmit={(message) => handleMessage(message)} />
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

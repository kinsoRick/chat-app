import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { actions as channelsActions } from '../../store/channelsSlice';
import { actions as messagesActions } from '../../store/messagesSlice';

import Message from './Message';
import socket from '../../socket';

const MessageListener = ({ channelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const messages = useSelector((state) => state.messages.entities);
  const filteredMessages = Object.values(messages)
    .filter((entity) => entity.channelId === channelId);

  useEffect(() => {
    const handleNewMessage = (payload) => {
      if (payload !== null) {
        dispatch(messagesActions.addMessage(payload));
      }
    };

    const handleNewChannel = (payload) => {
      if (payload !== null) {
        dispatch(channelsActions.addChannel(payload));
        toast.success(t('channelCreated'));
      }
    };

    const handleRemoveChannel = (payload) => {
      dispatch(channelsActions.removeChannel(payload.id));
      toast.success(t('channelRemoved'));
    };

    const handleRenameChannel = (payload) => {
      dispatch(channelsActions.updateChannel(payload));
      toast.success(t('channelRenamed'));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
  }, [channelId, dispatch, t]);

  return (
    <div className="content-body">
      {filteredMessages.map((message) => (
        <Message key={message.id} username={message.username} text={message.body} />
      ))}
    </div>
  );
};

MessageListener.propTypes = {
  channelId: PropTypes.number.isRequired,
};

export default MessageListener;

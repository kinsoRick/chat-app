import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { actions as channelsActions } from '../store/channelsSlice';
import { actions as messagesActions } from '../store/messagesSlice';

import { MemoMessage } from './Message';
import socket from '../socket';


function MessageListener({ channelId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const messages = useSelector((state) => state.messages.entities);
  const filteredMessages = useMemo(
    () => Object.values(messages).filter((entity) => entity.channelId === channelId),
    [messages, channelId],
  );

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      if (payload === null) return;
      dispatch(messagesActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      if (payload === null) return;
      dispatch(channelsActions.addChannel(payload));
      toast.success(t('channelCreated'))
    });

    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload.id));
      toast.success(t('channelRemoved'))
    });

    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.updateChannel(payload));
      toast.success(t('channelRenamed'))
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  });

  return (
    <div className="content-body">
      {
        filteredMessages.map((message) => (
          <MemoMessage
            key={message.id}
            username={message.username}
            text={message.body}
          />
        ))
      }
    </div>
  );
}

MessageListener.propTypes = {
  channelId: PropTypes.number.isRequired,
};

export default MessageListener;

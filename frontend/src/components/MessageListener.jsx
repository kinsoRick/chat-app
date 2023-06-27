import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { actions as channelsActions } from '../store/channelsSlice';
import { actions as messagesActions } from '../store/messagesSlice';

import { MemoMessage } from './Message';
import socket from '../socket';

function MessageListener({ channelId }) {
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.entities);
  const filteredMessages = useMemo(
    () => Object.values(messages).filter((entity) => entity.channelId === channelId),
    [messages, channelId],
  );

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      if (payload === null) return;
      dispatch(messagesActions.addMessage(payload)); // body, channelid, username, id
    });

    socket.on('newChannel', (payload) => {
      if (payload === null) return;
      dispatch(channelsActions.addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload.id));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.updateChannel(payload));
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

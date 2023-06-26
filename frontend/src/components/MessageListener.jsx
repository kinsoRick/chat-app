import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { actions as channelsActions } from '../store/channelsSlice';
import { actions as messagesActions } from '../store/messagesSlice';

import socket from '../socket';

function MessageListener({ channelId }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => {
    const { entities } = state.messages;
    const filtered = Object.values(entities).filter((entity) => entity.channelId === channelId);
    return filtered;
  });

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      if (payload === null) return;
      dispatch(messagesActions.addMessage(payload)); // body, channelid, username, id
    });

    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      console.log(payload); // { id: 6 };
    });

    socket.on('renameChannel', (payload) => {
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);

  return (
    <div className="content-body">
      {
        messages.map((message) => (
          <p key={message.id}>
            <b>{message.username}</b>
            {`:${message.body}`}
          </p>
        ))
      }
    </div>
  );
}

MessageListener.propTypes = {
  channelId: PropTypes.number.isRequired,
};

export default MessageListener;

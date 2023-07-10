/* eslint-disable react/destructuring-assignment */
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

import { actions as channelsActions } from '../../store/channelsSlice';
import { actions as messagesActions } from '../../store/messagesSlice';

import Message from './Message';
import SocketContext from '../../contexts/SocketContext';

const MessageListener = ({ channelId }) => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const baseChannelId = 1;

    socket.on('newMessage', (payload) => {
      if (payload !== null) {
        dispatch(messagesActions.addMessage(payload));
      }
    });

    socket.on('newChannel', (payload) => {
      if (payload !== null) {
        dispatch(channelsActions.addChannel(payload));
      }
    });

    socket.on('removeChannel', ({ id }) => {
      if (id === channelId) {
        dispatch(channelsActions.setCurrentChannel(baseChannelId));
      }
      dispatch(channelsActions.removeChannel(id));
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
  }, [socket, dispatch, channelId]);

  const messages = useSelector((state) => state.messages.entities);
  const filteredMessages = Object.values(messages)
    .filter((entity) => entity.channelId === channelId);

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

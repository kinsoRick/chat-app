import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

import { actions as channelsActions } from '../../store/channelsSlice';
import { actions as messagesActions } from '../../store/messagesSlice';

import Message from './Message';
import useSocket from '../../hooks/useSocket';

import { baseChannelId } from '../../constants';

const MessageListener = ({ channelId }) => {
  const dispatch = useDispatch();
  const { on, off } = useSocket();

  useEffect(() => {
    on('newMessage', (payload) => {
      if (payload !== null) {
        dispatch(messagesActions.addMessage(payload));
      }
    });

    on('newChannel', (payload) => {
      if (payload !== null) {
        dispatch(channelsActions.addChannel(payload));
      }
    });

    on('removeChannel', ({ id }) => {
      if (id === channelId) {
        dispatch(channelsActions.setCurrentChannel(baseChannelId));
      }
      dispatch(channelsActions.removeChannel(id));
    });

    on('renameChannel', (payload) => {
      dispatch(channelsActions.updateChannel(payload));
    });

    return () => {
      off('newMessage');
      off('newChannel');
      off('removeChannel');
      off('renameChannel');
    };
    // Линтер ругается на недостающий dependency
  }, [dispatch, channelId, on, off]);

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

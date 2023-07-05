import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

import useSocketEvents from '../../hooks/useSocketEvents';
import { actions as channelsActions } from '../../store/channelsSlice';
import { actions as messagesActions } from '../../store/messagesSlice';

import Message from './Message';

const MessageListener = ({ channelId }) => {
  const dispatch = useDispatch();

  const eventsMemo = useMemo(() => ([
    {
      name: 'newMessage',
      handler: (payload) => {
        if (payload !== null) {
          dispatch(messagesActions.addMessage(payload));
        }
      },
    },
    {
      name: 'newChannel',
      handler: (payload) => {
        if (payload !== null) {
          dispatch(channelsActions.addChannel(payload));
        }
      },
    },
    {
      name: 'removeChannel',
      handler: ({ id }) => {
        if (id === channelId) {
          dispatch(channelsActions.setCurrentChannel(1));
        }
        dispatch(channelsActions.removeChannel(id));
      },
    },
    {
      name: 'renameChannel',
      handler: (payload) => {
        dispatch(channelsActions.updateChannel(payload));
      },
    },
  ]), [channelId, dispatch]);

  useSocketEvents(eventsMemo);

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

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useSocketEvents from '../../hooks/useSocketEvents';
import { actions as channelsActions } from '../../store/channelsSlice';
import { actions as messagesActions } from '../../store/messagesSlice';

import Message from './Message';

const MessageListener = ({ channelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
          toast.success(t('channelCreated'));
        }
      },
    },
    {
      name: 'removeChannel',
      handler: ({ id }) => {
        dispatch(channelsActions.removeChannel(id));
        if (id === channelId) dispatch(channelsActions.setCurrentChannel(-1));
        toast.success(t('channelRemoved'));
      },
    },
    {
      name: 'renameChannel',
      handler: (payload) => {
        dispatch(channelsActions.updateChannel(payload));
        toast.success(t('channelRenamed'));
      },
    },
  ]), [dispatch, t]);

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

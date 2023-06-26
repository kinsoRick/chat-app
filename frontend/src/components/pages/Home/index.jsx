import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ServerSidebar, { Channel, Channels, ServerHeader } from '../../ServerSidebar';
import Dropdown from '../../Dropdown';
import MessageInput from '../../MessageInput';
import MessageListener from '../../MessageListener';
import AuthContext from '../../../contexts/AuthContext';

import getData from '../../../store/actions/getData';
import socket from '../../../socket';
import { actions as channelsActions } from '../../../store/channelsSlice';
import './index.scss';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, token } = useContext(AuthContext);

  const [channels, currentChannel, currentChannelId] = useSelector((state) => {
    const { entities } = state.channels ?? {};
    const currentEntityId = state.channels.currentChannelId;
    const currentEntity = (Object.keys(entities).length > 0) ? entities[currentEntityId - 1] : null;

    return [Object.values(entities), currentEntity, currentEntityId];
  });
  const status = useSelector((state) => state.channels.status === 'fulfilled');

  const sendMessage = ({ message }) => {
    socket.emit('newMessage', { body: message, channelId: currentChannelId, username: 'admin' });
  };

  const renderChannels = (channelsArray) => channelsArray
    .map(({ id, name, removable }) => (
      <Channel
        key={id}
        name={name}
        active={currentChannelId === id}
        onClick={() => dispatch(channelsActions.setCurrentChannel(id))}
      >
        {removable && <Dropdown />}
      </Channel>
    ));

  useEffect(() => {
    if (!auth) navigate('/login');
    if (!status) dispatch(getData(token));
  }, [auth, status, token, dispatch, navigate]);

  return (
    <section className="home-page">
      <ServerSidebar>
        <ServerHeader>Чат</ServerHeader>

        <Channels>
          {renderChannels(channels)}
        </Channels>
      </ServerSidebar>

      {
        status
        && (
          <main className="server-content">
            <div className="content-header">
              <span className="channel-name">{`# ${currentChannel.name}`}</span>
            </div>
            <MessageListener channelId={currentChannel.id} />
            <MessageInput onSubmit={(message) => sendMessage(message)} />
          </main>
        )
      }
    </section>
  );
}

export default Home;

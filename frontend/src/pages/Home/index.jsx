import { useNavigate } from 'react-router-dom';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ServerSidebar, { Channels } from '../../components/ServerSidebar';
import { MemoServerHeader } from '../../components/ServerSidebar/Header';
import { MemoChannel } from '../../components/ServerSidebar/Channel';
import Dropdown from '../../components/Dropdown';
import MessageInput from '../../components/MessageInput';
import MessageListener from '../../components/MessageListener';
import AuthContext from '../../contexts/AuthContext';

import getData from '../../store/actions/getData';
import socket from '../../socket';
import { actions as channelsActions } from '../../store/channelsSlice';
import './index.scss';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    auth, token, username, setToken, setUsername,
  } = useContext(AuthContext);

  const [activeDropdown, setActiveDropdown] = useState('');

  const toggleDropdown = (name) => {
    if (activeDropdown === name) setActiveDropdown('');
    else setActiveDropdown(name);
  };

  // CHANNELS HANDLING
  const channels = Object.values(useSelector((state) => state.channels.entities));
  const channelsLoaded = useSelector((state) => state.channels.status) === 'fulfilled';
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useMemo(
    () => channels.filter((channel) => channel.id === currentChannelId)[0] ?? null,
    [channels, currentChannelId],
  );

  const messages = useSelector((state) => state.messages.entities);
  const filteredMessages = useMemo(
    () => Object.values(messages).filter((entity) => entity.channelId === currentChannelId),
    [messages, currentChannelId],
  );

  useEffect(() => {
    if (!auth) navigate('/login');
    if (!channelsLoaded) dispatch(getData(token));
  }, [auth, channelsLoaded, dispatch, navigate, token]);

  const sendMessage = ({ message }) => {
    if (message === '') return;
    socket.emit('newMessage', { body: message, channelId: currentChannelId, username });
  };

  const logout = () => {
    setToken('');
    setUsername('');
  };

  return (
    <section className="home-page">
      <ServerSidebar>
        <MemoServerHeader>Чат</MemoServerHeader>

        <Channels>
          {channels.map(({ id, name, removable }) => (
            <MemoChannel
              key={id}
              name={name}
              active={currentChannelId === id}
              onClick={() => dispatch(channelsActions.setCurrentChannel(id))}
            >
              {removable
                && (
                  <Dropdown
                    channelId={id}
                    show={activeDropdown === name}
                    onClick={() => toggleDropdown(name)}
                  />
                )}
            </MemoChannel>
          ))}
        </Channels>
      </ServerSidebar>

      {
        channelsLoaded
        && (
          <main className="server-content">
            <div className="content-header">
              <div className="main-info">
                <span className="channel-name">{`# ${currentChannel.name}`}</span>
                <span className="channel-messages">{`${filteredMessages.length} сообщений`}</span>
              </div>
              <button type="button" className="ml-auto btn-logout" onClick={logout}>Выход</button>
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

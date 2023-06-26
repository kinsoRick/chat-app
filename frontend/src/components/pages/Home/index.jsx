import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ServerSidebar, { Channel, Channels, ServerHeader } from '../../ServerSidebar';
import MessageInput from '../../MessageInput';
import './index.scss';
import AuthContext from '../../../contexts/AuthContext';

const background = {
  background: "url('https://i.ibb.co/fD2k187/Photo.png')",
  width: '100vw',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
};

function Home() {
  const [activeChannel, setActiveChannel] = useState('main');
  const [message, setMessage] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) navigate('/login');
  });

  const sendMessage = (e) => {
    e.preventDefault();
    setMessage('');
  };

  return (
    <div style={background}>
      <ServerSidebar>
        <ServerHeader>Chat</ServerHeader>

        <Channels>
          <Channel
            name="main"
            active={activeChannel === 'main'}
            onClick={() => setActiveChannel('main')}
          />
          <Channel
            name="second"
            active={activeChannel === 'second'}
            onClick={() => setActiveChannel('second')}
          />
        </Channels>

        <div className="resizer" />
      </ServerSidebar>

      <main className="server-content">
        <div className="content-header">
          <span className="channel-name">
            #
            {activeChannel}
          </span>
          <span className="channel-messages">0 сообщений</span>
        </div>

        <div className="content-body" />
        <MessageInput value={message} onClick={sendMessage} onChange={setMessage} />
      </main>
    </div>
  );
}

export default Home;

import { useState } from "react"

import ServerSidebar from "../../ServerSidebar"
import MessageInput from "../../MessageInput"
import { Channel, Channels, ServerHeader } from "../../ServerSidebar"
import "./index.scss"

const background = {
  background: "url('https://i.ibb.co/fD2k187/Photo.png')",
  width: "100vw",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
}

function Home() {
  const [activeChannel, setActiveChannel] = useState('main');
  const [message, setMessage] = useState('');


  const sendMessage = (e) => {
    e.preventDefault();
    setMessage('');
  }

  return (
    <div style={background}>
      <ServerSidebar>
        <ServerHeader>Chat</ServerHeader>

        <Channels>
          <Channel
            name="main"
            active={activeChannel === "main"}
            onClick={() => setActiveChannel("main")}
          />
          <Channel
            name="general"
            active={activeChannel === "second"}
            onClick={() => setActiveChannel("second")}
            onRename={(e) => console.log(e)}
            onDelete={(e) => console.log(e)}
          />
        </Channels>

        <div className="resizer"></div>
      </ServerSidebar>

      <main className="server-content">
        <div className="content-header">
          <span className="channel-name"># {activeChannel}</span>
          <span className="channel-messages">0 сообщений</span>
        </div>

        <div className="content-body">

        </div>
        <MessageInput value={message} onClick={sendMessage} onChange={setMessage} />
      </main>
    </div>
  );
}

export default Home;

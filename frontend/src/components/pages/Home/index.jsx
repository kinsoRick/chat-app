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
  return (
    <div style={background}>
      <ServerSidebar>
        <ServerHeader>Server</ServerHeader>

        <Channels>
          <Channel
            text="main"
            active={activeChannel === "main"}
            onClick={() => setActiveChannel("main")}
          />
          <Channel
            text="general"
            active={activeChannel === "second"}
            onClick={() => setActiveChannel("second")}
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
        <MessageInput />
      </main>
    </div>
  );
}

export default Home;

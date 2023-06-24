import "./serverSidebar.scss";
import PropTypes from 'prop-types'

import ServerHeader from "./Header"
import Channel from "./Channel"
import Channels from "./Channels"

function ServerSidebar({ children }) {
  return (
    <aside className="server-sidebar">
      {children}
    </aside>
  );
}

ServerSidebar.propTypes = {
  children: PropTypes.node
}

export { Channel, ServerHeader, Channels }
export default ServerSidebar;

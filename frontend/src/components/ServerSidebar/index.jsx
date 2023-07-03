import './serverSidebar.scss';
import PropTypes from 'prop-types';

import ServerHeader from './Header';
import Channel from './Channel';
import Channels from './Channels';

const ServerSidebar = ({ children }) => (
  <aside className="server-sidebar">
    {children}
  </aside>
);

ServerSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Channel, ServerHeader, Channels };
export default ServerSidebar;

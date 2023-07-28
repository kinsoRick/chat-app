import './serverSidebar.scss';
import PropTypes from 'prop-types';

import Header from './Header';
import Channel from './Channel';
import Channels from './Channels';

const Sidebar = ({ children }) => (
  <aside className="server-sidebar">
    {children}
  </aside>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Channel, Header, Channels };
export default Sidebar;

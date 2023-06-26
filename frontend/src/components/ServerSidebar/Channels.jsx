import PropTypes from 'prop-types';

function Channels({ children }) {
  return (
    <div className="channels">
      <span className="channels-header">CHANNELS</span>
      <span className="channels-notifications ml-auto">{children.length}</span>
      <ul className="channels-items" style={{ padding: 0 }}>
        {children}
      </ul>
    </div>
  );
}

Channels.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Channels;

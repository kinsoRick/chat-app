import PropTypes from 'prop-types'

function ServerHeader({ children }) {
  return (
    <div className="server-header">
      <h2>{children}</h2>
      <i className="settings-icon ml-auto"></i>
    </div>
  );
}

ServerHeader.propTypes = {
  children: PropTypes.node
}

export default ServerHeader;

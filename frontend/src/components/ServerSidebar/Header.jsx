import PropTypes from 'prop-types';

function ServerHeader({ children }) {
  return (
    <div className="server-header">
      <h2>{children}</h2>
      <i className="settings-icon ml-auto" />
    </div>
  );
}

ServerHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ServerHeader;

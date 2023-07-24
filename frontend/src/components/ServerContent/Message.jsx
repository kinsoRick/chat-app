import PropTypes from 'prop-types';
import { memo } from 'react';

const Message = ({ username, text }) => (
  <div className="message">
    <p className="message-body">
      <b>{username}</b>
      {`: ${text}`}
    </p>
  </div>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default memo(Message);

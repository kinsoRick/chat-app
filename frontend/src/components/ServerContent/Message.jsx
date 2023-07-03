import PropTypes from 'prop-types';
import { memo } from 'react';

const Message = ({ username, text }) => {
  const firstChar = username.substring(0, 1);
  return (
    <div className="message">
      <div className="message-avatar">{firstChar}</div>
      <p className="message-body">
        <b>{username}</b>
        {`: ${text}`}
      </p>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default memo(Message);

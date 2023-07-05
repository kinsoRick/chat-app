import cn from 'classnames';
import PropTypes from 'prop-types';

const Channel = ({
  name, active, children, onClick,
}) => {
  const mainClasses = cn('channel', { active });

  return (
    <button type="button" className={mainClasses} onClick={onClick}>
      <span>{name}</span>
      {children}
    </button>
  );
};

Channel.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Channel;

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

Channel.defaultProps = {
  active: false,
  onClick: () => { },
  children: null,
};

Channel.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Channel;

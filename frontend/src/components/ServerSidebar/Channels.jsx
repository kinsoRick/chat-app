import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Channels({ children }) {
  const { t } = useTranslation();

  return (
    <div className="channels">
      <span className="channels-header">{t('channels')}</span>
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

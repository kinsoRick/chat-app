/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Channel from './Channel';
import Dropdown from '../Dropdown';

import { actions } from '../../store/channelsSlice';

const Channels = ({
  channels, currentChannelId,
  toggleDropdown, activeDropdown,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const childrenCount = channels.length;

  return (
    <div className="channels">
      <span className="channels-header">{t('channels')}</span>
      <span className="channels-notifications ml-auto">{childrenCount}</span>
      <ul className="channels-items" style={{ padding: 0 }}>
        {channels.map(({ id, name, removable }) => (
          <Channel
            key={name}
            name={name}
            active={currentChannelId === id}
            onClick={() => dispatch(actions.setCurrentChannel(id))}
          >
            {removable
            && (
              <Dropdown
                channelName={name}
                channelId={id}
                show={activeDropdown === name}
                onClick={() => toggleDropdown(name)}
              />
            )}
          </Channel>
        ))}
      </ul>
    </div>
  );
};

Channels.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentChannelId: PropTypes.number.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  activeDropdown: PropTypes.string.isRequired,
};

export default Channels;

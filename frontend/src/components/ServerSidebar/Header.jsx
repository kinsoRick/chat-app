import { memo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AddForm from '../Forms/AddForm';
import Modal from '../Modal';
import socket from '../../socket';

import { actions as modalsActions } from '../../store/modalsSlice';
import { actions as channelsActions } from '../../store/channelsSlice';

const ServerHeader = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const newServer = ({ serverName }) => {
    socket.emit('newChannel', { name: serverName }, ({ status, data }) => {
      if (status === 'ok') toast.success(t('channelCreated'));
      dispatch(channelsActions.addChannel(data));
      dispatch(channelsActions.setCurrentChannel(data.id));
    });
    dispatch(modalsActions.setCurrentModal('addModal'));
  };

  const currentModal = useSelector((state) => state.modals.currentModal);
  const isAddModal = currentModal === 'addModal';

  return (
    <div className="server-header">
      <h2>{children}</h2>
      <button
        type="button"
        onClick={() => dispatch(modalsActions.setCurrentModal('addModal'))}
        className="ml-auto hide-btn"
        data-modal
      >
        <i className="plus-icon" data-modal />
        <span className="visually-hidden">+</span>
      </button>

      {/* Modal created in Portal */}
      {isAddModal && (
        <Modal headerName="Добавить канал" name="addModal">
          <AddForm newServer={newServer} />
        </Modal>
      )}
    </div>
  );
};

ServerHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ServerHeader);

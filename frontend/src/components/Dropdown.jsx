import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import socket from '../socket';
import Modal from './Modal';
import dropdownIcon from '../assets/dropdown.svg';
import RenameForm from './Forms/RenameForm';

import { actions as modalsActions } from '../store/modalsSlice';

const Dropdown = ({ onClick, channelId, show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const dropdownClasses = cn('dropdown', { visible: show });

  const renameServer = ({ serverRename }) => {
    socket.emit('renameChannel', { id: channelId, name: serverRename }, ({ status }) => {
      if (status === 'ok') toast.success(t('channelRenamed'));
    });
    dispatch(modalsActions.setCurrentModal('renameModal'));
  };

  const deleteServer = () => {
    socket.emit('removeChannel', { id: channelId }, ({ status }) => {
      if (status === 'ok') toast.success(t('channelRemoved'));
    });
    dispatch(modalsActions.setCurrentModal('removeModal'));
  };

  const currentModal = useSelector((state) => state.modals.currentModal);
  const toggleDeleteModal = () => dispatch(modalsActions.setCurrentModal('removeModal'));
  const toggleRenameModal = () => dispatch(modalsActions.setCurrentModal('renameModal'));
  const isRenameModal = currentModal === 'renameModal';
  const isRemoveModal = currentModal === 'removeModal';

  return (
    <>
      <button type="button" onClick={onClick} className="dropdown-icon">
        <span className="visually-hidden">Управление каналом</span>
        <img src={dropdownIcon} alt="dropdown icon" />
      </button>

      <div className={dropdownClasses}>
        <button type="button" onClick={toggleDeleteModal}>
          {t('delete')}
        </button>
        <button type="button" onClick={toggleRenameModal}>
          {t('rename')}
        </button>
      </div>

      {/* Modal created in portal */}
      {isRenameModal && (
        <Modal headerName="Переименовать канал" name="renameModal">
          <RenameForm
            renameServer={renameServer}
          />
        </Modal>
      )}

      {isRemoveModal && (
        <Modal headerName="Удалить канал" name="removeModal">
          <h3 style={{ textAlign: 'center' }}>{t('sure')}</h3>

          <button
            type="button"
            className="btn-danger"
            onClick={deleteServer}
            style={{ margin: '0 10px 10px' }}
          >
            {t('delete')}
          </button>

          <button
            type="button"
            className="btn-success"
            onClick={() => dispatch(modalsActions.setCurrentModal('removeModal'))}
            style={{ margin: '0 10px 10px' }}
          >
            {t('cancel')}
          </button>
        </Modal>
      )}
    </>
  );
};

Dropdown.propTypes = {
  channelId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Dropdown;

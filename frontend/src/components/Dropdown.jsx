import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import socket from '../socket';
import Modal from './Modal';
import dropdownIcon from '../assets/dropdown.svg';
import RenameForm from './Forms/RenameForm';
import isNameAvailable from '../utils/isNameAvailable';
import AuthContext from '../contexts/AuthContext';

function Dropdown({ onClick, channelId, show = false }) {
  const { token } = useContext(AuthContext);
  const [showRenameModal, setRenameModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const { t } = useTranslation();

  const dropdownClasses = cn('dropdown', { visible: show });

  const toggleModal = (modalState, setModalState) => {
    setModalState(!modalState);
  };

  const toggleRenameModal = () => {
    toggleModal(showRenameModal, setRenameModal);
  };

  const toggleDeleteModal = () => {
    toggleModal(showDeleteModal, setDeleteModal);
  };

  const controlModal = (event, modalState, setModalState) => {
    const { modal } = event.target.dataset;
    if (modal !== undefined) toggleModal(modalState, setModalState);
  };

  const renameServer = ({ serverRename }) => {
    isNameAvailable(serverRename, token).then((flag) => {
      if (flag) socket.emit('renameChannel', { id: channelId, name: serverRename });
    });

    toggleRenameModal();
  };

  const deleteServer = () => {
    socket.emit('removeChannel', { id: channelId });
  };

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
      {showRenameModal && (
        <Modal controlModal={(e) => controlModal(e, showRenameModal, setRenameModal)} showModal={showRenameModal} headerName="Переименовать канал">
          <RenameForm
            renameServer={renameServer}
            controlModal={(e) => controlModal(e, showRenameModal, setRenameModal)}
          />
        </Modal>
      )}

      <Modal controlModal={(e) => controlModal(e, showDeleteModal, setDeleteModal)} showModal={showDeleteModal} headerName="Удалить канал">
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
          onClick={(e) => controlModal(e, showDeleteModal, setDeleteModal)}
          style={{ margin: '0 10px 10px' }}
          data-modal
        >
          {t('cancel')}
        </button>
      </Modal>
    </>
  );
}

Dropdown.defaultProps = {
  show: false,
};

Dropdown.propTypes = {
  channelId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default Dropdown;

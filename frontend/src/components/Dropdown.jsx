import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import socket from '../socket';
import Modal from './Modal';
import dropdownIcon from '../assets/dropdown.svg';
import RenameForm from './Forms/RenameForm';
import AuthContext from '../contexts/AuthContext';

function Dropdown({
  onClick, channelId, show = false,
}) {
  const { token } = useContext(AuthContext);
  const [showRenameModal, setRenameModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);

  const { t } = useTranslation();

  const dropdownClasses = cn('dropdown', { visible: show });

  const onDelete = () => setDeleteModal(!showDeleteModal);
  const onRename = () => setRenameModal(!showRenameModal);

  const controlRenameModal = (event) => {
    const { modal } = event.target.dataset;
    if (modal !== undefined) setRenameModal(!showRenameModal);
  };

  const controlDeleteModal = (event) => {
    const { modal } = event.target.dataset;
    if (modal !== undefined) setDeleteModal(!showDeleteModal);
  };

  const renameServer = ({ serverRename }) => {
    isNameAvailable(serverRename, token).then((flag) => {
      if (flag) socket.emit('renameChannel', { id: channelId, name: serverRename });
    });
    
    setRenameModal(!showRenameModal);
  };

  const deleteServer = () => socket.emit('removeChannel', { id: channelId });

  return (
    <>
      <button
        type="button"
        onClick={(e) => onClick(e)}
        className="dropdown-icon"
      >
        <img src={dropdownIcon} alt="dropdown icon" />
      </button>

      <div className={dropdownClasses}>
        <button type="button" onClick={(e) => onDelete(e)}>{t('delete')}</button>
        <button type="button" onClick={(e) => onRename(e)}>{t('rename')}</button>
      </div>

      {/* Modal created in portal */}
      <Modal controlModal={controlRenameModal} showModal={showRenameModal} headerName="Переименовать канал">
        <RenameForm renameServer={renameServer} controlModal={controlRenameModal} />
      </Modal>

      <Modal controlModal={controlDeleteModal} showModal={showDeleteModal} headerName="Удалить канал">
        <h3 style={{ textAlign: 'center' }}>{t('sure')}</h3>

        <button
          type="button"
          className="btn-cancel"
          onClick={() => deleteServer()}
          style={{ margin: '0 10px 10px' }}
        >
          {t('delete')}
        </button>

        <button
          type="button"
          className="btn-success"
          onClick={(e) => controlDeleteModal(e)}
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

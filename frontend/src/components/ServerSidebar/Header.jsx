import { useState, memo, useContext } from 'react';
import PropTypes from 'prop-types';

import AddForm from '../Forms/AddForm';
import Modal from '../Modal';
import socket from '../../socket';
import isNameAvailable from '../../utils/isNameAvailable';

import AuthContext from '../../contexts/AuthContext';

function ServerHeader({ children }) {
  const { token } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const controlModal = (event) => {
    const { modal } = event.target.dataset;
    if (modal !== undefined) setShowModal(!showModal);
  };

  const newServer = ({ serverName }) => {
    isNameAvailable(serverName, token).then((flag) => {
      if (flag) socket.emit('newChannel', { name: serverName });
    });
    setShowModal(!showModal);
  };

  return (
    <div className="server-header">
      <h2>{children}</h2>
      <button
        type="button"
        onClick={(e) => controlModal(e)}
        className="ml-auto hide-btn"
        data-modal
      >
        <i className="plus-icon" data-modal />
        <span className="visually-hidden">+</span>
      </button>

      {/* Modal created in Portal */}
      {showModal && (
        <Modal controlModal={controlModal} showModal={showModal} headerName="Добавить канал">
          <AddForm newServer={newServer} controlModal={controlModal} />
        </Modal>
      )}
    </div>
  );
}

ServerHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ServerHeader);

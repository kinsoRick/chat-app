import { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import AddForm from '../Forms/AddForm';
import Modal from '../Modal';

import { actions as modalsActions } from '../../store/modalsSlice';

const ServerHeader = ({ children }) => {
  const dispatch = useDispatch();

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
          <AddForm />
        </Modal>
      )}
    </div>
  );
};

ServerHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ServerHeader);

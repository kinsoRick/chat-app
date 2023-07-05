/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import cn from 'classnames';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { actions as modalsActions } from '../store/modalsSlice';

const Modal = ({
  children, headerName, name,
}) => {
  const dispatch = useDispatch();
  const currentModal = useSelector((state) => state.modals.currentModal);

  const modalStyles = cn('modal', {
    show: currentModal === name,
  });

  const controlModal = (event) => {
    if ('modal' in event.nativeEvent.target.dataset) {
      dispatch(modalsActions.setCurrentModal(name));
    }
  };

  return createPortal((
    <div className={modalStyles} data-modal onClick={(e) => controlModal(e)}>
      <div className="modal-content" style={{ width: '50%' }}>
        <div className="pane">
          <h3 className="text-center">{headerName}</h3>
          <hr />
          {children}
        </div>
      </div>
    </div>), document.body);
};

export default Modal;

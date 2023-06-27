/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import cn from 'classnames';
import { createPortal } from 'react-dom';

function Modal({
  children, showModal, controlModal, headerName,
}) {
  const modalStyles = cn('modal', { show: showModal });

  return createPortal((
    <div className={modalStyles} data-modal onClick={(e) => controlModal(e)}>
      <div className="modal-content" style={{ width: '40%' }}>
        <div className="pane">
          <h3 className="text-center">{headerName}</h3>
          <hr />
          {children}
        </div>
      </div>
    </div>), document.body);
}

export default Modal;

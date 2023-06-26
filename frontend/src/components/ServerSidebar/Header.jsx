/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';

import socket from '../../socket';

function ServerHeader({ children }) {
  const [showModal, setShowModal] = useState(false);
  const modalStyles = cn('modal', { show: showModal });

  const controlModal = (event) => {
    const { modal } = event.target.dataset;
    if (modal !== undefined) setShowModal(!showModal);
  };

  const newServer = ({ serverName }) => {
    socket.emit('newChannel', { name: serverName });
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
      </button>
      {createPortal(
        <div className={modalStyles} data-modal onClick={(e) => controlModal(e)}>
          <div className="modal-content" style={{ width: '40%' }}>
            <div className="pane">
              <h3 className="text-center">Добавить канал</h3>
              <hr />
              <Formik
                initialValues={{
                  serverName: '',
                }}
                onSubmit={(values, { resetForm }) => {
                  newServer(values);
                  resetForm();
                  setShowModal(!showModal);
                }}
              >
                <Form className="server-form">
                  <Field className="server-name-input" id="serverName" name="serverName" placeholder="Название сервера" />
                  <br />
                  <button type="submit" className="btn-success">Отправить</button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={(e) => controlModal(e)}
                    data-modal
                  >
                    Отменить
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>, document.body)}
    </div>
  );
}

ServerHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ServerHeader;

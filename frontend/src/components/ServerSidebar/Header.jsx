import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Modal from '../Modal';
import socket from '../../socket';

function ServerHeader({ children }) {
  const [showModal, setShowModal] = useState(false);

  const controlModal = (event) => {
    const { modal } = event.target.dataset;
    if (modal !== undefined) setShowModal(!showModal);
  };

  const newServer = ({ serverName }) => {
    socket.emit('newChannel', { name: serverName });
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
      </button>

      {/* Modal created in Portal */}
      <Modal controlModal={controlModal} showModal={showModal} headerName="Добавить канал">
        <Formik
          initialValues={{
            serverName: '',
          }}
          onSubmit={(values, { resetForm }) => {
            newServer(values);
            resetForm();
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
      </Modal>
    </div>
  );
}

ServerHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ServerHeader;

export const MemoServerHeader = memo(ServerHeader);

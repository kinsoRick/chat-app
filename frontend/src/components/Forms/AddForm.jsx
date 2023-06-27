import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

function AddForm({ newServer, controlModal }) {
  return (
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
  );
}

AddForm.propTypes = {
  newServer: PropTypes.func.isRequired,
  controlModal: PropTypes.func.isRequired,
};

export default AddForm;

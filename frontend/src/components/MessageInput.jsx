import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import sendSvg from '../assets/send.svg';

function MessageInput({ onSubmit }) {
  return (
    <Formik
      initialValues={{
        message: '',
      }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form className="message-input">

        <Field id="message" name="message" placeholder="Сообщение" />

        <button type="submit">
          <img src={sendSvg} alt="Send icon" />
        </button>
      </Form>
    </Formik>
  );
}

MessageInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MessageInput;

import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import sendSvg from '../assets/send.svg';

function MessageInput({ onSubmit }) {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        message: '',
      }}
      onSubmit={(values, { resetForm }) => {
        const { message } = values;
        const newVal = { message: filter.clean(message) };
        onSubmit(newVal);
        resetForm();
      }}
    >
      <Form className="message-input">

        <Field id="message" name="message" placeholder={t('message')} />

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

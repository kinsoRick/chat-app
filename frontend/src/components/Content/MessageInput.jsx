import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import sendSvg from '../../assets/send.svg';

const MessageInput = ({ onSubmit }) => {
  const { t } = useTranslation();

  const handleSubmit = async (values, { resetForm }) => {
    const { message } = values;
    const sanitizedMessage = filter.clean(message);
    const newVal = { message: sanitizedMessage };
    try {
      await onSubmit(newVal);
      resetForm();
    } catch (error) {
      throw new Error(`MESSAGEINPUT: ${error.message}`);
    }
  };

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form className="message-input">
        <Field id="message" name="message" placeholder={t('message')} aria-label="Новое сообщение" />
        <button type="submit">
          <img src={sendSvg} alt="Send icon" />
        </button>
      </Form>
    </Formik>
  );
};

MessageInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MessageInput;

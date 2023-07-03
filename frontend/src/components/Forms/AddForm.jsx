import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const AddForm = ({ newServer, controlModal }) => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        serverName: '',
      }}
      onSubmit={(values, { resetForm }) => {
        // TODO: Обработать ошибки + async
        newServer(values);
        resetForm();
      }}
    >
      <Form className="server-form">
        <div className="floating-field" style={{ width: '100%' }}>
          <Field className="server-name-input" id="serverName" name="serverName" placeholder={t('serverName')} />
          <label htmlFor="serverName">{t('serverName')}</label>
        </div>

        <br />

        <button type="submit" className="btn-success">{t('send')}</button>
        <button
          type="button"
          className="btn-cancel"
          onClick={(e) => controlModal(e)}
          data-modal
        >
          {t('cancel')}
        </button>
      </Form>
    </Formik>
  );
};

AddForm.propTypes = {
  newServer: PropTypes.func.isRequired,
  controlModal: PropTypes.func.isRequired,
};

export default AddForm;

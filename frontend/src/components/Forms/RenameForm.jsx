import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';

const RenameForm = ({ renameServer, controlModal }) => {
  const { t } = useTranslation();
  const channelsNames = Object.values(useSelector((state) => state.channels.entities))
    .map((channel) => channel.name);

  const renameSchema = Yup.object().shape({
    serverRename: Yup.string().notOneOf(channelsNames, t('unique')),
  });

  return (
    <Formik
      initialValues={{
        serverRename: '',
      }}
      validationSchema={renameSchema}
      onSubmit={(values, { resetForm }) => {
        try {
          renameServer(values);
          resetForm();
        } catch (err) {
          const errorCode = err.response?.data?.statusCode;
          switch (errorCode) {
            default:
              throw new Error(`Unexpected error: ${err.message}`);
          }
        }
      }}
    >
      <Form className="server-form">
        <div className="floating-field" style={{ width: '100%' }}>
          <Field className="server-name-input" id="serverRename" name="serverRename" placeholder={t('serverRename')} />
          <label htmlFor="serverRename">{t('serverRename')}</label>
          <ErrorMessage name="serverRename" component="div" className="input-error" />
        </div>

        <br />
        <button type="submit" className="btn-success">{t('rename')}</button>
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

RenameForm.propTypes = {
  renameServer: PropTypes.func.isRequired,
  controlModal: PropTypes.func.isRequired,
};

export default RenameForm;

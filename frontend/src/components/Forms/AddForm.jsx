import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { actions as modalsActions } from '../../store/modalsSlice';

const AddForm = ({ newServer }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channelsNames = Object.values(useSelector((state) => state.channels.entities))
    .map((channel) => channel.name);

  const renameSchema = Yup.object().shape({
    serverName: Yup.string().notOneOf(channelsNames, t('unique')),
  });
  return (
    <Formik
      initialValues={{
        serverName: '',
      }}
      validationSchema={renameSchema}
      onSubmit={(values, { resetForm }) => {
        try {
          newServer(values);
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
          <Field className="server-name-input" id="serverName" name="serverName" placeholder={t('serverName')} />
          <label htmlFor="serverName">{t('serverName')}</label>
          <ErrorMessage name="serverName" component="div" className="input-error" />
        </div>

        <br />

        <button type="submit" className="btn-success">{t('send')}</button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => dispatch(modalsActions.setCurrentModal('addModal'))}
        >
          {t('cancel')}
        </button>
      </Form>
    </Formik>
  );
};

AddForm.propTypes = {
  newServer: PropTypes.func.isRequired,
};

export default AddForm;

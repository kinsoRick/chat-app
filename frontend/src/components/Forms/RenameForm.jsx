import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { actions as modalsActions } from '../../store/modalsSlice';
import useSocket from '../../hooks/useSocket';

const RenameForm = ({ channelId, channelName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameChannel } = useSocket();

  const channelsNames = Object.values(useSelector((state) => state.channels.entities))
    .map((channel) => channel.name);

  const renameSchema = Yup.object().shape({
    channelRename: Yup.string().notOneOf(channelsNames, t('unique')),
  });

  const rename = async ({ channelRename }) => {
    renameChannel(channelId, channelRename, ({ status }) => {
      if (status === 'ok') toast.success(t('channelRenamed'));
    });
    dispatch(modalsActions.toggleModal('renameModal'));
  };

  return (
    <Formik
      initialValues={{
        channelRename: channelName,
      }}
      validationSchema={renameSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await rename(values);
          resetForm();
        } catch (error) {
          throw new Error(`RENAMEFORM: ${error.message}`);
        }
      }}
    >
      <Form className="channel-form">
        <div className="floating-field" style={{ width: '100%' }}>
          <Field className="channel-name-input" id="channelRename" name="channelRename" onFocus={(e) => e.target.select()} placeholder={t('channelRename')} autoFocus />
          <label htmlFor="channelRename">{t('channelRename')}</label>
          <ErrorMessage name="channelRename" component="div" className="input-error" />
        </div>

        <br />
        <button type="submit" className="btn-success">{t('rename')}</button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => dispatch(modalsActions.toggleModal('renameModal'))}
        >
          {t('cancel')}
        </button>
      </Form>
    </Formik>
  );
};

RenameForm.propTypes = {
  channelId: PropTypes.number.isRequired,
  channelName: PropTypes.string.isRequired,
};

export default RenameForm;

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { actions as modalsActions } from '../../store/modalsSlice';
import { actions as channelsActions } from '../../store/channelsSlice';
import useSocket from '../../hooks/useSocket';

const AddForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addChannel } = useSocket();

  const channelsNames = Object.values(useSelector((state) => state.channels.entities))
    .map((channel) => channel.name);

  const renameSchema = Yup.object().shape({
    serverName: Yup.string().notOneOf(channelsNames, t('unique')),
  });

  const newChannel = ({ serverName }) => {
    addChannel(serverName, ({ status, data }) => {
      if (status === 'ok') {
        toast.success(t('channelCreated'));
        dispatch(channelsActions.addChannel(data));
        dispatch(channelsActions.setCurrentChannel(data.id));
      }
    });
    // WONTFIX: В каждом из экшенов открытия и закрытия придётся сравнивать
    // какое модальное окно открыто на данный момент с переданным окном
    // Если где-то появится баг того, что вызывается ещё не нужное окно
    // его тяжелее будет отследить так как закрытие и открытие может происходить
    // в разных частях кода
    dispatch(modalsActions.toggleModal('addModal'));
  };

  return (
    <Formik
      initialValues={{
        serverName: '',
      }}
      validationSchema={renameSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await newChannel(values);
          resetForm();
        } catch (error) {
          throw new Error(`ADDFORM: ${error.message}`);
        }
      }}
    >
      <Form className="server-form">
        <div className="floating-field" style={{ width: '100%' }}>
          <Field className="server-name-input" id="serverName" name="serverName" placeholder={t('serverName')} autoFocus />
          <label htmlFor="serverName">{t('serverName')}</label>
          <ErrorMessage name="serverName" component="div" className="input-error" />
        </div>

        <br />

        <button type="submit" className="btn-success">{t('send')}</button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => dispatch(modalsActions.toggleModal('addModal'))}
        >
          {t('cancel')}
        </button>
      </Form>
    </Formik>
  );
};

export default AddForm;

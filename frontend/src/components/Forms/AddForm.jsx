import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { actions as modalsActions } from '../../store/modalsSlice';
import { actions as channelsActions } from '../../store/channelsSlice';

import socket from '../../socket';

const AddForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channelsNames = Object.values(useSelector((state) => state.channels.entities))
    .map((channel) => channel.name);

  const renameSchema = Yup.object().shape({
    serverName: Yup.string().notOneOf(channelsNames, t('unique')),
  });

  const newServer = async ({ serverName }) => {
    socket.addChannel(serverName, ({ status, data }) => {
      if (status === 'ok') {
        toast.success(t('channelCreated'));
        dispatch(channelsActions.addChannel(data));
        // Тут приходит ответ от сервера, который говорит о статусе окей при создании сервера
        // значит и проверять пользователя на владение канала необязательно
        dispatch(channelsActions.setCurrentChannel(data.id));
      }
    });
    dispatch(modalsActions.setCurrentModal('addModal'));
  };

  return (
    <Formik
      initialValues={{
        serverName: '',
      }}
      validationSchema={renameSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await newServer(values);
          resetForm();
        } catch (error) {
          throw new Error(`ADDFORM: ${error.message}`);
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

export default AddForm;

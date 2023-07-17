import { useNavigate } from 'react-router-dom';
import {
  useEffect, useMemo, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ServerSidebar, { Channels, ServerHeader } from '../../components/ServerSidebar';
import ServerContent from '../../components/ServerContent';
import getData from '../../store/actions/getData';
import './index.scss';
import useAuthorization from '../../hooks/useAuthorization';

import { actions as channelsActions } from '../../store/channelsSlice';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, setToken } = useAuthorization();

  const [activeDropdown, setActiveDropdown] = useState('');
  const status = useSelector((state) => state.channels.status);
  const error = useSelector((state) => state.channels.error);

  useEffect(() => {
    if (error === 401) {
      navigate('/login');
      setToken('');
      dispatch(channelsActions.resetError());
    } else if (status === 'idle') {
      dispatch(getData(token));
    }
  }, [dispatch, navigate, status, token, setToken, error]);

  const channels = Object.values(useSelector((state) => state.channels.entities));
  const channelsLoaded = (status === 'fulfilled');
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const currentChannel = useMemo(
    () => channels.find((channel) => channel?.id === currentChannelId) ?? null,
    [channels, currentChannelId],
  );

  const toggleDropdown = (name) => {
    setActiveDropdown((prevState) => (prevState === name ? '' : name));
  };

  return (
    <section className="home-page">
      <ServerSidebar>
        <ServerHeader>{t('chat')}</ServerHeader>
        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
        />
      </ServerSidebar>

      {channelsLoaded && (
        <ServerContent
          currentChannel={currentChannel}
        />
      )}
    </section>
  );
};

export default Home;

import { useNavigate } from 'react-router-dom';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ServerSidebar, { Channels, ServerHeader } from '../../components/ServerSidebar';
import ServerContent from '../../components/ServerContent';
import AuthContext from '../../contexts/AuthContext';

import getData from '../../store/actions/getData';
import './index.scss';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, token } = useContext(AuthContext);

  const [activeDropdown, setActiveDropdown] = useState('');

  useEffect(() => {
    // TODO: Создать Private Route
    if (!auth) navigate('/login');
    dispatch(getData(token));
  }, [auth, dispatch, navigate, token]);

  const channels = Object.values(useSelector((state) => state.channels.entities));
  const channelsLoaded = useSelector((state) => state.channels.status) === 'fulfilled';
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

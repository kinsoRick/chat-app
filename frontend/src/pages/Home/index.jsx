import {
  useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Sidebar, { Channels, Header } from '../../components/Sidebar';
import Content from '../../components/Content';
import './index.scss';

const Home = () => {
  const { t } = useTranslation();

  const [activeDropdown, setActiveDropdown] = useState('');
  const status = useSelector((state) => state.channels.status);

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
      <Sidebar>
        <Header>{t('chat')}</Header>
        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
        />
      </Sidebar>

      {channelsLoaded && (
        <Content
          currentChannel={currentChannel}
        />
      )}
    </section>
  );
};

export default Home;

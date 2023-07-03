import { useTranslation } from 'react-i18next';
import './index.scss';

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1>{t('notFound')}</h1>
      <h1><span className="ascii">(╯°□°）╯︵ ┻━┻</span></h1>
      <a href="/">{t('backToHome')}</a>
    </div>
  );
}

export default NotFound;

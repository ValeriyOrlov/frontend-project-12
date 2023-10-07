import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1>{t('Page_not_found')}</h1>
      <a href="/">{t('Go_to_the_main_page')}</a>
    </div>
  );
};

export default ErrorPage;

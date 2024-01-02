// messageBundle.js
import { createIntl, createIntlCache, IntlProvider } from 'react-intl';

const cache = createIntlCache();

const locales = {
    en: require('./locales/msgBundle_en.json'),
    es: require('./locales/msgBundle_es.json'),
};

const getLocaleMessages = (locale) => locales[locale].messages;
const getValidationMessages = (locale) => locales[locale].validationMessages;

export const intl = createIntl(
    {
        locale: 'en', // Default locale
        messages: getLocaleMessages('en'), // Default messages
        //validationMessages:getValidationMessages("en")}
        defaultLocale: 'en',
    },
    cache
);

export const setLocale = (locale) => {
    intl.locale = locale;
    intl.messages = getLocaleMessages(locale);
};

export const setValidationMessages = (locale) => {
    intl.validationMessages = getValidationMessages(locale);
};

export const I18nProvider = ({ children }) => (
    <IntlProvider locale={intl.locale} messages={intl.messages}>
        {children}
    </IntlProvider>
);

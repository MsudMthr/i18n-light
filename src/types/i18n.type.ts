export type I18nMessagesType = {
    [key: string]: object | (() => object);
};

export type I18nConfigTypes = {
    locale: string;
    fallbackLocale: string;
    messages: I18nMessagesType;
};
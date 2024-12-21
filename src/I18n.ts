import {I18nConfigTypes} from "./types/i18n.type";

class I18n {

    private static locale: string;
    private static messages: object;
    private static fallbackLocale: string;
    private static fallbackMessages: object;
    private static config: I18nConfigTypes;

    static initialize(config: I18nConfigTypes) {
        this.locale = config.locale;
        this.fallbackLocale = config.fallbackLocale;
        this.config = config;
        this.initializeMessages(this.locale);
    }

    static getValue(key: string): string | object {
        const path: string[] = key.split('.');

        let value: string | object | undefined = this.messages;

        path.forEach((part) => {
            if (!(value && value.hasOwnProperty(part))) {
                value = undefined;
                return;
            }

            // @ts-ignore
            value = value[part];
        });

        // Get the message from the fallback if it doesn't exist in the current locale's messages
        if (value === undefined) {
            value = this.fallbackMessages;
            path.forEach((part) => {
                if (!(value && value.hasOwnProperty(part))) {
                    value = undefined;
                    return;
                }

                // @ts-ignore
                value = value[part];
            });
        }

        return value !== undefined ? value : key;
    }

    static replaceVariables(value: string = '', variables: object | undefined) {
        const regex = /{(.*?)}/g;

        return value.replace(regex, (match, key: string) => {
            if (!variables) return '';

            // @ts-ignore
            return variables.hasOwnProperty(key) ? variables[key] : match;
        });
    }

    static t(key: string, variables?: undefined | object): string | object {
        const value = this.getValue(key);
        if (typeof value === "object") {
            return key;
        }

        return this.replaceVariables(value, variables);
    }

    private static initializeMessages(locale: string) {
        const data: object | (() => object) = this.config.messages[locale];
        const fallbackData: object | (() => object) = this.config.messages[this.fallbackLocale];

        if (typeof data === 'function') {
            this.messages = data();
        } else {
            this.messages = data;
        }

        if (typeof fallbackData === 'function') {
            this.fallbackMessages = fallbackData();
        } else {
            this.fallbackMessages = fallbackData;
        }
    }


    static get getLocale(): string {
        return this.locale;
    }
}

export default I18n;

import {I18nConfigTypes} from "./types/i18n.type";

class I18n {

    private static locale: string;
    private static messages: object;
    private static config: I18nConfigTypes;

    static initialize(config: I18nConfigTypes) {
        this.locale = config.locale;
        this.config = config;
        this.setLocale(this.locale);
    }

    static getValue(key: string): string | object {
        const path: string[] = key.split('.');

        let value: string | object = this.messages;

        path.forEach((part) => {
            if (!(value.hasOwnProperty(part))) {
                return key;
            }

            // @ts-ignore
            value = value[part];
        });

        return value;
    }

    static replaceVariables(value: string = '', variables: object = {}) {

        const regex = /{(.*?)}/g;

        return value.replace(regex, (match, key: string) => {
            // @ts-ignore
            return variables.hasOwnProperty(key) ? variables[key] : match;
        });
    }

    static t(key: string, variables = {}): string | object {
        const value = this.getValue(key);

        if (typeof value === 'object') {
            return value;
        }

        return this.replaceVariables(value, variables);
    }

    private static setLocale(locale: string) {
        const data: object | (() => object) = this.config.messages[locale];

        if (typeof data === 'function') {
            this.messages = data()
        } else {
            this.messages = data
        }
    }

    static get getLocale(): string {
        return this.locale;
    }
}

function createI18n(config: I18nConfigTypes) {
    I18n.initialize(config);

    function install(app: any) {
        app.config.globalProperties.$t = (key: string, variables: object) => I18n.t(key, variables)
    }

    return {
        install
    };
}

export {I18n, createI18n};

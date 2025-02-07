import { I18nConfigTypes } from "./types/i18n.type";
import {hasOwnProperty, isEmpty} from "./utils";

class I18n {
    private static locale: string;
    private static messages: object;
    private static config: I18nConfigTypes;

    static initialize(config: I18nConfigTypes) {
        this.locale = config.locale;
        this.config = config;
        this.initializeMessages(this.locale);
    }

    static _replaceVariables(message: string, variables: Record<string, string>): string {
        const regex = /{(.*?)}/g;

        return message.replace(regex, function (match, key) {
            return hasOwnProperty(variables, key) ? variables[key] : match;
        });
    }

    static translate(key: string, variables: Record<string, string> | null = null): string {
        if (hasOwnProperty(this.messages, key)) {
            let value = (this.messages as Record<string, string>)[key];

            if (variables && !isEmpty(variables)) {
                value = this._replaceVariables(value, variables);
            }

            return value;
        }

        const path = key.split('.');
        let value: unknown = this.messages;

        for (const segment of path) {
            if (!hasOwnProperty(value as object, segment)) {
                return key;
            }
            value = (value as Record<string, unknown>)[segment];
        }

        if (typeof value !== "string") {
            return key; // Ensure we return a string
        }

        if (variables && !isEmpty(variables)) {
            value = this._replaceVariables(value, variables);
        }

        return <string>value;
    }


    private static initializeMessages(locale: string) {
        const data: object | (() => object) = this.config.messages[locale];

        this.messages =
            typeof data === "function" ? data() : data;
    }

    /**
     * Returns the current locale.
     */
    static get getLocale(): string {
        return this.locale;
    }
}

export default I18n;

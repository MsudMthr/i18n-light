# I18n Library - A Simple Internationalization Solution for JavaScript

## Overview

This library provides an easy-to-use internationalization (i18n) solution for JavaScript applications. It allows you to store translations for different languages, retrieve them dynamically, and replace variables within those translations. This can be helpful for building multi-language applications with minimal setup.

## Features

- **Locale Management**: Set and change the active language (locale) easily.
- **Translation Lookup**: Retrieve translations using keys (supporting nested keys).
- **Variable Replacement**: Automatically replace placeholders in translations with dynamic values.
- **Flexible Configuration**: Supports different message formats for each locale, including functions that return translations.

## Installation

To install the i18n library, simply import it into your JavaScript project.

```bash
npm install small-i18n
```

## Usage

### Step 1: Configure I18n

First, define the i18n configuration and provide translation messages for different locales.

```ts
const i18nConfig = {
    locale: 'en', // Default locale
    messages: {
        en: {
            greeting: "Hello, {name}!",
            user: {
                profile: "User Profile",
                settings: "User Settings"
            }
        },
        fr: {
            greeting: "Bonjour, {name}!",
            user: {
                profile: "Profil de l'utilisateur",
                settings: "Paramètres de l'utilisateur"
            }
        }
    }
};
```

### Step 2: Install into Your App

you can install the i18n instance.

```ts
I18n.initialize(i18nConfig);
```

### Step 3: Using Translations in the App

In your app, you can use the `$t` function to fetch translated strings and pass in any dynamic variables for replacements.

```js
I18n.t('greeting', { name: 'John' });
```

In the above example:
- `$t('greeting', { name: 'John' })` replaces `{name}` with `John` in the translation.
- `$t('user.profile')` returns a nested translation value.

### Step 4: Changing the Locale

You can change the locale dynamically by updating the locale property. This will change the active language for your app.

```ts
I18n.initialize({ locale: 'fr', messages: i18nConfig.messages });  // Switches to French locale
```

### Example in Action

Suppose you have the following configuration:

```ts
const i18nConfig = {
    locale: 'en',
    messages: {
        en: {
            greeting: "Hello, {name}!",
            user: {
                profile: "User Profile",
                settings: "User Settings"
            }
        },
        fr: {
            greeting: "Bonjour, {name}!",
            user: {
                profile: "Profil de l'utilisateur",
                settings: "Paramètres de l'utilisateur"
            }
        }
    }
};
```

In the English version (`en`), calling `$t('greeting', { name: 'John' })` will return:

```
Hello, John!
```

If you change the locale to French (`fr`), it will return:

```
Bonjour, John!
```

Similarly, for nested translations, `$t('user.profile')` will return:

- `User Profile` for English.
- `Profil de l'utilisateur` for French.

## API

### `initialize(config: I18nConfigTypes): void`
Initializes the I18n system with the provided configuration.

- **Parameters**:
    - `config`: Configuration object containing `locale` and `messages`.

### `getValue(key: string): string | object`
Fetches the translation for a given key. It supports nested keys and returns either a string or an object.

- **Parameters**:
    - `key`: The key for the translation (can be nested, e.g., `'user.profile'`).

### `replaceVariables(value: string, variables: object): string`
Replaces placeholders in the translation string with provided values.

- **Parameters**:
    - `value`: The string containing placeholders.
    - `variables`: An object containing key-value pairs for replacing placeholders.

### `t(key: string, variables: object): string | object`
Fetches the translation for the provided key and replaces any variables in the string.

- **Parameters**:
    - `key`: The key for the translation.
    - `variables`: An object containing values to replace placeholders in the translation.

### `setLocale(locale: string): void`
Sets the current locale for the i18n system.

- **Parameters**:
    - `locale`: The new locale to set (e.g., `'en'`, `'fr'`).

### `get getLocale(): string`
Returns the current locale.

## Conclusion

This i18n library provides a lightweight solution for managing translations in your JavaScript or TypeScript project. It supports multiple locales, nested keys, and dynamic variables for a fully localized user experience.
```

This README provides all the necessary information in Markdown format, including installation instructions, usage examples, and API documentation.
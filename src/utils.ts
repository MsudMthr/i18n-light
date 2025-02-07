function isEmpty(value: unknown): boolean {
    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (isObject(value)) {
        return isEmptyObject(value);
    }

    return value === undefined || value === null || value === '';
}

function hasOwnProperty(object: object, key: string | number | symbol): boolean {
    return Object.prototype.hasOwnProperty.call(object, key);
}

function isObject(value: unknown): value is Record<string, unknown> {
    return Object.prototype.toString.call(value) === '[object Object]';
}

function isEmptyObject(value: object): boolean {
    for (const property in value) {
        if (hasOwnProperty(value, property)) {
            return false;
        }
    }
    return true;
}

export { isEmpty, hasOwnProperty, isObject, isEmptyObject };

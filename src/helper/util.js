function logInfo(...message) {
    console.log(...message);
}

function toString(data) {
    return (data ?? '').toString();
}

function toJson(data) {
    if (Array.isArray(data)) {
        return data;
    }
    try {
        return JSON.parse(data);
    } catch {
        if (typeof (data) === 'object') {
            return data;
        }
        return (str ?? '').toString();
    }
}

function toStringify(json) {
    return JSON.stringify(json);
}

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

function shuffle(list) {
    const size = list.length;
    for (let i = 0; i < size; i++) {
        const tempIndex = Math.floor(Math.random() * size)
        const tempElement = list[i];
        list[i] = list[tempIndex];
        list[tempIndex] = tempElement;
    }
}

function isEmpty(value) {
    return !value && value.trim().length == 0
}

const STRING_REGEX = /^(?=.*[\w\d]).+/;

export const keys = (obj) => {
    return Object.keys(obj) || [];
}

export const groupBy = (data, field) => {
    if (!Array.isArray(data)) {
        const key = data[field];
        return { key: [data] }
    } else {
        const result = {};
        for (const item of data) {
            const key = field(item);
            if (result[key]) {
                result[key].push(item);
            } else {
                result[key] = [item]
            }
        }
        return result;
    }
}

export const header = (data, removeHeader = []) => {
    const respectiveHeader = { header: true };
    if (!Array.isArray(data) || data.length === 0) {
        return respectiveHeader;
    }
    keys(data[0]).forEach(key => {
        if (removeHeader.includes(key)) {
            return;
        }
        respectiveHeader[key] = key.replaceAll(/([A-Z])/g, ` $1`).trim();
    })
    return respectiveHeader;
}

export { logInfo, toString, toJson, toStringify, debounce, shuffle, isEmpty, STRING_REGEX };
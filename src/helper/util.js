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

export { logInfo, toString, toJson, toStringify, debounce, shuffle };
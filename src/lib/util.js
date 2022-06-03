export const log = (...args) => console.log(...args);
export const logError = (...args) => console.error(...args);
export const renderIf = (test, component) => test ? component : undefined;
export const classToggler = (options) => Object.keys(options).filter(key => !!options[key]).join(' ');

export const checkAndAdd = (payload, state) => {
    var found = state.some(function (el) {
        return el.id === payload.id;
    });
    if (!found) state.push(payload);
    return state;
};
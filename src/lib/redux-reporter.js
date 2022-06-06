import { logError } from './util.js';

const reporter = store => next => action => {
    try {
        let result = next(action);
        return result;
    } catch (err) {
        err.action = action;
        logError('__ERROR__', err);
        return err;
    }
};

export default reporter;
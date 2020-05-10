
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function redirect(url, state = {}) {
    history.push(url, state);
}

export {
    history,
    redirect
};

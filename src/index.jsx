
import 'normalize.css';
import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { App } from 'app/App';
import { history } from 'app/helpers/routing';

function renderApp() {
    render(
        <Router history={ history }>
            <App />
        </Router>
        , document.getElementById('app')
    );
}

renderApp();

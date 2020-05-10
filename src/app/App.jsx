
import styles from './app.scss';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Collages } from 'app/modules/collages/Collages';
import { Drawings } from 'app/modules/drawings/Drawings';
import { Photos } from 'app/modules/photos/Photos';
import { Home } from 'app/modules/home/Home';
import { Header } from 'app/modules/header/Header';
import { BASE_ROUTE } from 'app/constants/routes';
import { Footer } from 'app/modules/footer/Footer';

const App = () => {
    return (
        <div className={ styles['app'] }>
            <Header />

            <Switch>
                <Route exact path={ BASE_ROUTE.collages } component={ Collages } />
                <Route exact path={ BASE_ROUTE.drawings } component={ Drawings } />
                <Route exact path={ BASE_ROUTE.photos } component={ Photos } />
                <Route exact path={ BASE_ROUTE.root } component={ Home } />
                <Route path='*' component={ Home } />
            </Switch>

            <Footer />
        </div>
    );
};

export { App };


import styles from './header.scss';
import React from 'react';
import { Link } from 'app/components/link/Link';
import { BASE_ROUTE } from 'app/constants/routes';
import { redirect } from 'app/helpers/routing';
import { ContentContainer } from 'app/components/contentContainer/ContentContainer';

const Header = () => {
    function redirectToHome() {
        redirect(BASE_ROUTE.root);
    }

    return (
        <header className={ styles.header }>
            <ContentContainer>
                <div className={ styles['header__content'] }>
                    <h1 className={ styles['header__content__title'] }
                        onClick={ redirectToHome }>
                        Yves Pellier
                    </h1>

                    <nav className={ styles['header__content__nav']}>
                        <Link className={ styles['header__content__nav__link']}
                              isNav={ true }
                              to={ BASE_ROUTE.photos }>
                            Photos
                        </Link>

                        <Link className={ styles['header__content__nav__link']}
                              isNav={ true }
                              to={ BASE_ROUTE.collages }>
                            Collages
                        </Link>

                        <Link className={ styles['header__content__nav__link']}
                              isNav={ true }
                              to={ BASE_ROUTE.drawings }>
                            Dessins
                        </Link>
                    </nav>
                </div>
            </ContentContainer>
        </header>
    );
};

export { Header };

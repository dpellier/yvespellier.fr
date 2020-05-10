
import styles from './home.scss';
import React from 'react';
import { ContentContainer } from 'app/components/contentContainer/ContentContainer';
import collageCoverUrl from 'assets/images/collages/1-800.jpg';
import drawingsCoverUrl from 'assets/images/drawings/10-800.jpg';
import photoCoverUrl from 'assets/images/photos/5-800.jpg';
import { redirect } from 'app/helpers/routing';
import { BASE_ROUTE } from 'app/constants/routes';

const Home = () => {
    function redirectToCollages() {
        redirect(BASE_ROUTE.collages);
    }

    function redirectToDrawings() {
        redirect(BASE_ROUTE.drawings);
    }

    function redirectToPhotos() {
        redirect(BASE_ROUTE.photos);
    }

    return (
        <ContentContainer>
            <div className={ styles.home }>
                <div className={ styles['home__photos'] }
                     onClick={ redirectToPhotos }>
                    <img className={ styles['home__photos__cover'] }
                         src={ photoCoverUrl }
                         alt='photo'
                         height={ 300 } />

                    <h3 className={ styles['home__photos__label'] }>
                        Photos
                    </h3>
                </div>

                <div className={ styles['home__collages'] }
                     onClick={ redirectToCollages }>
                    <img className={ styles['home__collages__cover'] }
                         src={ collageCoverUrl }
                         alt='collage'
                         height={ 300 } />

                    <h3 className={ styles['home__collages__label'] }>
                        Collages
                    </h3>
                </div>

                <div className={ styles['home__drawings'] }
                     onClick={ redirectToDrawings }>
                    <img className={ styles['home__drawings__cover'] }
                         src={ drawingsCoverUrl }
                         alt='dessin'
                         height={ 300 } />

                    <h3 className={ styles['home__drawings__label'] }>
                        Drawings
                    </h3>
                </div>
            </div>
        </ContentContainer>
    );
};

export { Home };

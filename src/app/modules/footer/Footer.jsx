
import styles from 'app/modules/footer/footer.scss';
import React from 'react';
import { ContentContainer } from 'app/components/contentContainer/ContentContainer';

const Footer = () => (
    <footer className={ styles.footer }>
        <ContentContainer>
            <div className={ styles['footer__content'] }>
                © Yves Pellier
            </div>
        </ContentContainer>
    </footer>
);

export { Footer };

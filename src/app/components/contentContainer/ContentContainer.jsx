
import styles from './contentContainer.scss';
import React from 'react';
import PropTypes from 'prop-types';

const ContentContainer = ({ children }) => (
    <div className={ styles['content-container'] }>
        { children }
    </div>
);

ContentContainer.propTypes = {
    children: PropTypes.node.isRequired
};

export { ContentContainer };

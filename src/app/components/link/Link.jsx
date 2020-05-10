
import styles from './link.scss';
import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BASE_ROUTES } from 'app/constants/routes';

const Link = ({ children, className, isNav, to }) => {
    const Component = isNav ? NavLink : RouterLink;

    return (
        <Component className={ `${styles.link} ${className}` }
                   to={ to }>
            { children }
        </Component>
    );
}

Link.defaultProps = {
    className: ''
};

Link.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isNav: PropTypes.bool.isRequired,
    to: PropTypes.oneOf(BASE_ROUTES).isRequired
};

export { Link };

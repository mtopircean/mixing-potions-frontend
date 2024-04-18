import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h1 className="mb-3">404 - Not Found</h1>
            <h2>We are heartbroken that your page was not found!</h2>
            <FontAwesomeIcon icon={faHeartCrack} className={styles.iconHeart} />

            <h4>
                Select Home from the menu area to return to the
                main page
            </h4>
        </div>
    );
};

export default NotFound;

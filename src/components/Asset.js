import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '../styles/Asset.module.css';

const Asset = ({ src, message }) => {
    return (
        <div>
            <Spinner
                animation="border"
                variant="primary"
                className={styles.Spinner}
            />
            {src && <img src={src} alt={message} className={styles.Image} />}
        </div>
    );
};

export default Asset;

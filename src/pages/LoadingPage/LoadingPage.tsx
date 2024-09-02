import React from 'react';
import styles from './LoadingPage.module.css';

export const LoadingPage = () => {
    return (
        <div className={styles.noPage}>
            <div className={styles.h2}>
               Loading...
            </div>
        </div>
    )
}

export default LoadingPage
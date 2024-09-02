import React from 'react';
import { Link } from "react-router-dom";
import styles from './NoPage.module.css';

const NoPage = () => {
    return (
        <div className={styles.noPage}>
            <div className={styles.h2}>
                Page 404 not found
            </div>
            <div >
                <Link
                    to={"/"}
                    className={styles.return}
                >
                    Return to homepage
                </Link>
            </div>
        </div>
    )
}

export default NoPage
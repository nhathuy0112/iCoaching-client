import React from 'react';
import styles from './Spinner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Spinner() {
    return (
        <div className={cx('spinner')}>
            <div className={cx('spinner-inner')}></div>
        </div>
    );
}

export default Spinner;

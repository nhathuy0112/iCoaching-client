import React from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Navbar = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className={cx('navbar')}>
            <span className={cx('logo')}></span>
            <div className={cx('user')}>
                <img src={currentUser?.Avatar} alt="" />
                <span>{currentUser?.Fullname}</span>
            </div>
        </div>
    );
};

export default Navbar;

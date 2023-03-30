import React, { useEffect } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { db } from '~/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

const Navbar = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className={cx('navbar')}>
            <span className={cx('logo')}></span>
            <div className={cx('user')}>
                <img src={currentUser?.Avatar ? currentUser?.Avatar : require('~/assets/images/Facebook.png')} alt="" />
                <span>{currentUser?.Username}</span>
            </div>
        </div>
    );
};

export default Navbar;

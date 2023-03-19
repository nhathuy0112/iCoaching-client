import React from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import Search from '../Search';
import Chats from '../Chats';
import Navbar from '../Navbar';

const cx = classNames.bind(styles);

const SideBar = () => {
    return (
        <div className={cx('sidebar')}>
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
};

export default SideBar;

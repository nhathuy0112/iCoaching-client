import React, { useEffect } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import SideBar from '../SideBar';
import Chat from '../Chat';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '~/features/chatSlice';

const cx = classNames.bind(styles);

const Home = () => {
    const { coachId } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className={cx('wrapper', { wrapperClient: coachId })}>
            <div className={cx('container')}>
                {coachId ? (
                    <Chat />
                ) : currentUser.role === 'COACH' ? (
                    <SideBar />
                ) : (
                    <>
                        <SideBar />
                        <Chat />
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;

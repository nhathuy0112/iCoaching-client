import React from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import SideBar from '../SideBar';
import Chat from '../Chat';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Home = () => {
    const { coachId } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div
            className={cx(
                'wrapper',
                { wrapperClient: coachId },
                { wrapperNavBar: currentUser?.role !== 'COACH' && !coachId },
            )}
        >
            <div className={cx('container')}>
                {coachId ? (
                    <Chat />
                ) : currentUser?.role === 'COACH' ? (
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

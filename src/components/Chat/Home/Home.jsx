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
    const chatId = useSelector((state) => state.chat.chatId);

    return (
        <div
            className={cx(
                'wrapper',
                { wrapperClient: coachId },
                { wrapperNavBar: currentUser?.role !== 'COACH' && !coachId },
                { wrapperCoach: currentUser?.role === 'COACH' },
            )}
        >
            <div className={cx('container')}>
                {coachId ? (
                    <Chat />
                ) : currentUser?.role === 'COACH' ? (
                    <SideBar />
                ) : !chatId ? (
                    <>
                        <SideBar />
                        <h3
                            style={{
                                width: 'auto',
                                display: 'flex',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                fontWeight: '500',
                                fontSize: '24px',
                                color: 'gray',
                            }}
                        >
                            Bạn chưa có cuộc trò chuyện nào...
                        </h3>
                    </>
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

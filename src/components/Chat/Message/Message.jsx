import React, { useEffect, useRef, useState } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '~/firebase';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Message = ({ message }) => {
    const { currentUser } = useSelector((state) => state.user);
    const user = useSelector((state) => state.chat.user);
    const [coachAvatar, setCoachAvatar] = useState('');
    const { coachId } = useParams();
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    useEffect(() => {
        if (coachId) {
            const q = query(collection(db, 'users'), where('uid', '==', user));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setCoachAvatar(doc.data());
                });
            });

            return () => unsubscribe();
        }
    }, [user, coachId]);

    return (
        <div ref={ref} className={cx('message', { owner: message.senderId === currentUser?.Id })}>
            {coachId ? (
                <div className={cx('onlineInfo')}>
                    <img
                        className={cx('imgInfo')}
                        src={message.senderId === currentUser?.Id ? currentUser?.Avatar : coachAvatar.avatar}
                        alt=""
                    />

                    <div
                        className={cx({
                            onlineStatus: coachAvatar.isOnline && message.senderId !== currentUser?.Id,
                            offlineStatus: !coachAvatar.isOnline && message.senderId !== currentUser?.Id,
                        })}
                    ></div>
                </div>
            ) : (
                <img
                    className={cx('imgInfo')}
                    src={message.senderId === currentUser?.Id ? currentUser?.Avatar : user.avatar}
                    alt=""
                />
            )}

            <div className={cx('messageContent')}>
                {message.text && <p>{message.text}</p>}
                {message.img && <img src={message.img} alt="" />}
                {message.video && <video src={message.video} controls />}
                <span className={cx('moment')}>{message.time}</span>

                {/* <Moment locale="vi" format="DD/MM/yyyy HH:mm" className={cx('moment')}>
                    {message.time}
                </Moment> */}
            </div>
        </div>
    );
};

export default Message;

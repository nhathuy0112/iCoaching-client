import React, { useEffect, useRef } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

const cx = classNames.bind(styles);

const Message = ({ message }) => {
    const { currentUser } = useSelector((state) => state.user);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div ref={ref} className={cx('message', { owner: message.senderId === currentUser?.Id })}>
            <img className={cx('imgInfo')} src={require('~/assets/images/Facebook.png')} alt="" />

            <div className={cx('messageContent')}>
                {message.img && !message.text && <img src={message.img} alt="" />}

                {!message.img && message.text && <p>{message.text}</p>}

                {message.img && message.text && (
                    <>
                        <p>{message.text}</p>
                        <img src={message.img} alt="" />
                    </>
                )}
                <Moment locale="vi" format="[Hôm nay], [lúc] HH:mm" className={cx('moment')}>
                    {message.date.toDate()}
                </Moment>
            </div>
        </div>
    );
};

export default Message;

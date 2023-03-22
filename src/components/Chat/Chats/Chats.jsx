import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '~/firebase';
import { changeUser } from '~/features/chatSlice';
import { BsCardImage } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Chats = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.chat.user);
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getChats = () => {
            if (currentUser?.Id) {
                const unsub = onSnapshot(doc(db, 'userChats', currentUser?.Id), (doc) => {
                    setChats(doc.data());
                });

                return () => {
                    unsub();
                };
            } else {
                return;
            }
        };

        currentUser?.Id && getChats();
    }, [currentUser?.Id]);

    const handleSelect = (u) => {
        dispatch(changeUser({ currentUser, payload: u }));
        if (currentUser.role === 'COACH') {
            navigate(`/coach/${currentUser.Id}/messages/${u.uid}`);
        }
    };
    // console.log(user);
    // console.log(Object.entries(chats));
    return (
        <div className={cx('chats')}>
            {chats &&
                Object.entries(chats)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                        <div className={cx('userChat')} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                            <img src={require('~/assets/images/Facebook.png')} alt="" />
                            <div className={cx('userChatInfo')}>
                                <span>{chat[1].userInfo?.username}</span>
                                {chat[1].lastMessage?.img ? (
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <BsCardImage /> Image
                                    </p>
                                ) : (
                                    <p>{chat[1].lastMessage?.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
        </div>
    );
};

export default Chats;

import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '~/firebase';
import { changeUser } from '~/features/chatSlice';
import { BsCardImage } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Chats = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.chat.user);
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const chatId = useSelector((state) => state.chat.chatId);
    const [userAvatar, setUserAvatar] = useState('');

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
        dispatch(changeUser({ currentUser: currentUser, payload: u }));
        if (currentUser.role === 'COACH') {
            navigate(`/coach/${currentUser.Id}/messages/${u.uid}`);
        }
    };

    useEffect(() => {
        if (user.uid) {
            const q = query(collection(db, 'users'), where('uid', '==', user.uid));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setUserAvatar(doc.data());
                });
            });

            return () => unsubscribe();
        }
    }, [user.uid]);

    useEffect(() => {
        if (currentUser?.Id) {
            const currentUserDocRef = doc(db, 'userChats', currentUser?.Id);
            if (chatId && userAvatar) {
                const unsubscribe = onSnapshot(currentUserDocRef, (docSnapshot) => {
                    const userData = docSnapshot.data();
                    if (userData && userData[chatId]) {
                        updateDoc(currentUserDocRef, {
                            [`${chatId}.userInfo.avatar`]: userAvatar.avatar,
                        });
                    }
                });
                return () => unsubscribe();
            }
        }
    }, [currentUser?.Id, chatId, userAvatar]);

    return (
        <div className={cx('chats')}>
            {chats &&
                Object.entries(chats)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                        <div className={cx('userChat')} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                            <img src={chat[1].userInfo?.avatar} alt="" />
                            <div className={cx('userChatInfo')}>
                                <span>{chat[1].userInfo?.fullname}</span>
                                {chat[1].lastMessage?.img ? (
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <BsCardImage /> Đã gửi một ảnh.
                                    </p>
                                ) : chat[1].lastMessage?.video ? (
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        Đã gửi một video.
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

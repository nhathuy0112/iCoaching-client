import React, { useEffect, useState } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
    onSnapshot,
} from 'firebase/firestore';
import { db } from '~/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { changeUser } from '~/features/chatSlice';

const cx = classNames.bind(styles);

const Search = () => {
    const { currentUser } = useSelector((state) => state.user);
    const chatId = useSelector((state) => state.chat.chatId);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const dispatch = useDispatch();
    const [chats, setChats] = useState();

    useEffect(() => {
        const getChats = () => {
            if (currentUser?.Id) {
                const unsub = onSnapshot(doc(db, 'userChats', currentUser?.Id), (doc) => {
                    const chatsData = doc.data() || {};
                    const chatList = Object.keys(chatsData).map((chatId) => {
                        return {
                            uid: chatsData[chatId].userInfo.uid,
                            fullname: chatsData[chatId].userInfo.fullname,
                            avatar: chatsData[chatId].userInfo.avatar,
                            username: chatsData[chatId].userInfo.username,
                        };
                    });
                    const filteredChats = chatList.filter((chat) => {
                        return chat.fullname;
                    });
                    setChats(filteredChats);
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

    const handleKey = (e) => {
        if (e.key === 'Enter' && username !== '') {
            const filteredChats = chats.filter((chat) => {
                return chat.fullname.includes(username);
            });
            setUser(filteredChats);
        }
    };

    const handleSelect = (selectedUser) => {
        dispatch(changeUser({ currentUser, payload: selectedUser }));
        setUser([]);
        setUsername('');
    };

    return (
        <div className={cx('search')}>
            <div className={cx('searchForm')}>
                <FaSearch />
                <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    onKeyDown={handleKey}
                    onChange={(e) => {
                        const value = e.target.value;
                        setUsername(value);
                        if (value === '') {
                            setUser([]);
                            setUsername('');
                        }
                    }}
                    value={username}
                />
            </div>
            {err && <span>User not found!</span>}
            {user &&
                user.map((user) => (
                    <div key={user.uid} className={cx('userChat')} onClick={() => handleSelect(user)}>
                        <img src={user.avatar ? user.avatar : require('~/assets/images/Facebook.png')} alt="" />
                        <div className={cx('userChatInfo', { usserChatInfoSearch: user })}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{user.fullname}</span>
                                <span style={{ color: 'rgba(0, 0, 0, 0.422)', fontSize: ' 14px' }}>
                                    {user.username}
                                </span>
                            </div>
                            <FaSearch className={cx('iconChat')} />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Search;

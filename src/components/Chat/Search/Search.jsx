import React, { useState } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '~/firebase';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const cx = classNames.bind(styles);

const Search = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'),
            where('fullname', '>=', username),
            where('fullname', '<=', username + '\uf8ff'),
        );

        try {
            const querySnapshot = await getDocs(q);
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUser(users);
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();
    };

    const handleSelect = async (selectedUser) => {
        const combinedId =
            currentUser?.Id > selectedUser.uid
                ? currentUser?.Id + selectedUser.uid
                : selectedUser.uid + currentUser?.Id;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                await updateDoc(doc(db, 'userChats', currentUser?.Id), {
                    [combinedId + '.userInfo']: {
                        uid: selectedUser.uid,
                        username: selectedUser.username,
                        email: selectedUser.email,
                        avatar: selectedUser.avatar,
                        fullname: selectedUser.fullname,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', selectedUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser?.Id,
                        username: currentUser?.Username,
                        email: currentUser?.email,
                        avatar: currentUser?.Avatar,
                        fullname: currentUser?.Fullname,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {}

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

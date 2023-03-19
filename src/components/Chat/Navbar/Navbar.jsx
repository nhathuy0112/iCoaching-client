import React, { useEffect } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { db } from '~/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Navbar = () => {
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            registerUser(currentUser);
        }
    }, [currentUser]);

    const registerUser = async (userToken) => {
        try {
            await setDoc(doc(db, 'users', userToken?.Id), {
                uid: userToken?.Id,
                username: userToken?.Username,
                email: userToken?.email,
            });
            const userChatsRef = doc(db, 'userChats', userToken?.Id);
            const userChatsDoc = await getDoc(userChatsRef);
            if (!userChatsDoc.exists()) {
                await setDoc(userChatsRef, {});
            }
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    };
    return (
        <div className={cx('navbar')}>
            <span className={cx('logo')}>Chat</span>
            <div className={cx('user')}>
                <img src={require('~/assets/images/Facebook.png')} alt="" />
                <span>{currentUser?.Username}</span>
            </div>
        </div>
    );
};

export default Navbar;

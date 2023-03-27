import React, { useEffect } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { db } from '~/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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
                avatar: userToken?.Avatar,
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

    useEffect(() => {
        if (currentUser) {
            const updateUserAvatar = async () => {
                try {
                    const userDocRef = doc(db, 'users', currentUser.Id);
                    await updateDoc(userDocRef, {
                        avatar: currentUser?.Avatar,
                        isOnline: true,
                    });
                } catch (error) {
                    console.error('Error updating user email:', error);
                    throw error;
                }
            };
            updateUserAvatar();
        }
    }, [currentUser?.Avatar, currentUser]);

    return (
        <div className={cx('navbar')}>
            <span className={cx('logo')}></span>
            <div className={cx('user')}>
                <img src={currentUser?.Avatar ? currentUser?.Avatar : require('~/assets/images/Facebook.png')} alt="" />
                <span>{currentUser?.Username}</span>
            </div>
        </div>
    );
};

export default Navbar;

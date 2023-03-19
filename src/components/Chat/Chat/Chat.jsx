import React, { useEffect, useState } from 'react';
import { BsCameraVideoFill } from 'react-icons/bs';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import Messages from '../Messages';
import Input from '../Input';
import { useSelector } from 'react-redux';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '~/firebase';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Chat = () => {
    const user = useSelector((state) => state.chat.user);
    const { currentUser } = useSelector((state) => state.user);
    const [currentCoach, setCurrentCoach] = useState([]);
    const { coachId } = useParams();
    const chatId = useSelector((state) => state.chat.chatId);
    const userID = currentUser?.Username;
    const userName = 'userName' + userID;
    const appID = 1980920521;
    const serverSecret = '904c93a69f182068e7447a43b7350c1b';
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    function invite() {
        const targetUser = {
            userID: user?.username,
            userName: user?.username,
        };

        zp.sendCallInvitation({
            callees: [targetUser],
            callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
            timeout: 60,
        })
            .then((res) => {
                console.warn(res);
            })
            .catch((err) => {
                console.warn(err);
            });
    }

    useEffect(() => {
        if (coachId) {
            async function handleSearch() {
                const q = query(collection(db, 'users'), where('uid', '==', coachId));

                try {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setCurrentCoach(doc.data());
                    });
                } catch (err) {
                    console.log(err);
                }
            }
            handleSearch();
        }
    }, [coachId]);

    useEffect(() => {
        if (currentCoach.uid && chatId) {
            const handleSelect = async () => {
                const res = await getDoc(doc(db, 'chats', chatId));

                if (!res.exists()) {
                    await setDoc(doc(db, 'chats', chatId), { messages: [] });

                    await updateDoc(doc(db, 'userChats', currentUser?.Id), {
                        [chatId + '.userInfo']: {
                            uid: currentCoach?.uid,
                            username: currentCoach?.username,
                            email: currentCoach?.email,
                        },
                        [chatId + '.date']: serverTimestamp(),
                    });

                    await updateDoc(doc(db, 'userChats', currentCoach?.uid), {
                        [chatId + '.userInfo']: {
                            uid: currentUser?.Id,
                            username: currentUser?.Username,
                            email: currentUser?.email,
                        },
                        [chatId + '.date']: serverTimestamp(),
                    });
                }
            };
            handleSelect();
        }
    });
    return currentUser.role === 'COACH' ? (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('chat')}>
                    <div className={cx('chatInfo')}>
                        <span>{user.username}</span>
                        <div className={cx('chatIcons')} onClick={invite}>
                            <BsCameraVideoFill />
                        </div>
                    </div>
                    <Messages />
                    <Input />
                </div>
            </div>
        </div>
    ) : (
        <div className={cx('chat')}>
            <div className={cx('chatInfo')}>
                <span>{user.username}</span>
                <div className={cx('chatIcons')} onClick={invite}>
                    <BsCameraVideoFill />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;

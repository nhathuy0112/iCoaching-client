import React, { useEffect, useState } from 'react';
import { BsCameraVideoFill } from 'react-icons/bs';
import { IoChevronBackSharp } from 'react-icons/io5';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import Messages from '../Messages';
import Input from '../Input';
import { useDispatch, useSelector } from 'react-redux';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '~/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { changeUser } from '~/features/chatSlice';

const cx = classNames.bind(styles);

const Chat = () => {
    const user = useSelector((state) => state.chat.user);
    const { currentUser } = useSelector((state) => state.user);
    const [currentCoach, setCurrentCoach] = useState([]);
    const { coachId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chatId = useSelector((state) => state.chat.chatId);
    let zp;

    useEffect(() => {
        init();
    });

    async function init() {
        const userID = currentUser?.Username;
        const userName = 'userName' + userID;
        const { token } = await generateToken('https://node-express-vercel-master-one.vercel.app', userID);
        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(1980920521, token, null, userID, userName);
        zp = ZegoUIKitPrebuilt.create(KitToken);
        zp.addPlugins({ ZIM });
    }
    function generateToken(tokenServerUrl, userID) {
        return fetch(`${tokenServerUrl}/api/userID/${userID}`, {
            method: 'GET',
        }).then((res) => res.json());
        // return fetch(`${tokenServerUrl}/api/get_access_token?userID=${userID}&expired_ts=7200`, {
        //     method: 'GET',
        // }).then((res) => res.json());
    }

    function handleSend(callType) {
        const targetUser = {
            userID: user?.username,
            userName: user?.username,
        };

        zp.sendCallInvitation({
            callees: [targetUser],
            callType: callType,
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

    const [status, setStatus] = useState('');
    useEffect(() => {
        if (user.uid) {
            const q = query(collection(db, 'users'), where('uid', '==', user.uid));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setStatus(doc.data());
                });
            });

            return () => unsubscribe();
        }
    }, [user.uid]);

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
                            avatar: currentCoach?.avatar,
                        },
                        [chatId + '.date']: serverTimestamp(),
                    });

                    await updateDoc(doc(db, 'userChats', currentCoach?.uid), {
                        [chatId + '.userInfo']: {
                            uid: currentUser?.Id,
                            username: currentUser?.Username,
                            email: currentUser?.email,
                            avatar: currentUser?.Avatar,
                        },
                        [chatId + '.date']: serverTimestamp(),
                    });
                }
            };
            handleSelect();
        }
    });

    useEffect(() => {
        if (!chatId && currentUser?.role === 'COACH') {
            navigate(`/coach/${currentUser.Id}/messages`);
        }
    });

    const handleBack = () => {
        navigate(`/coach/${currentUser.Id}/messages`);
        dispatch(changeUser({ currentUser: '', payload: '' }));
    };
    return currentUser?.role === 'COACH' ? (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('chat')}>
                    <div className={cx('chatInfo')}>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <div
                                className={cx('backHome')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleBack()}
                            >
                                <IoChevronBackSharp />
                                <span>Trở lại</span>
                            </div>

                            <span style={{ borderLeft: '2px solid lightgray', paddingLeft: '5px', color: 'white' }}>
                                {user.username}
                            </span>
                        </span>

                        {status.isOnline ? (
                            <div
                                className={cx('chatIcons')}
                                onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
                            >
                                <BsCameraVideoFill />
                            </div>
                        ) : (
                            <div>Người dùng hiện chưa online</div>
                        )}
                    </div>
                    <Messages />
                    <Input />
                </div>
            </div>
        </div>
    ) : (
        <div className={cx('chat', { chatClient: currentUser?.role !== 'COACH' && !coachId })}>
            <div className={cx('chatInfo', { chatInfoClient: coachId })}>
                <span>{user.username}</span>
                {status.isOnline ? (
                    <div
                        className={cx('chatIcons')}
                        onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
                    >
                        <BsCameraVideoFill />
                    </div>
                ) : (
                    <div>Người dùng hiện chưa online</div>
                )}
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;

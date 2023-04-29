import React, { useEffect, useState } from 'react';
import { BsCameraVideoFill, BsDot } from 'react-icons/bs';
import { IoChevronBackSharp } from 'react-icons/io5';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import Messages from '../Messages';
import Input from '../Input';
import { nfd } from 'unorm';
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
    const [status, setStatus] = useState('');
    const user = useSelector((state) => state.chat.user);
    const { currentUser } = useSelector((state) => state.user);
    const [currentCoach, setCurrentCoach] = useState([]);
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { coachId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chatId = useSelector((state) => state.chat.chatId);
    let zp;

    useEffect(() => {
        init();
    });

    function removeAccents(str) {
        return nfd(str)
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    const init = async () => {
        const userID = currentUser?.Username;
        const userName = removeAccents(currentUser?.Fullname);
        const { token } = await generateToken('https://node-express-vercel-master-one.vercel.app', userID);
        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(1980920521, token, null, userID, userName);
        zp = ZegoUIKitPrebuilt.create(KitToken);
        zp.addPlugins({ ZIM });
        ZIM.getInstance().setLogConfig({ logLevel: 'disable' });
        if (currentUser === null) {
            zp.destroy();
        }
    };

    function generateToken(tokenServerUrl, userID) {
        return fetch(`${tokenServerUrl}/api/userID/${userID}`, {
            method: 'GET',
        }).then((res) => res.json());
        // return fetch(`${tokenServerUrl}/api/get_access_token?userID=${userID}&expired_ts=7200`, {
        //     method: 'GET',
        // }).then((res) => res.json());
    }

    function handleSend(callType) {
        if (zp) {
            const targetUser = {
                userID: user?.username,
                userName: user?.fullname,
            };
            zp.setCallInvitationConfig({
                ringtoneConfig: {
                    incomingCallUrl: 'http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3',
                    outgoingCallUrl: 'http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3',
                },
                // onIncomingCallTimeout: (callID, caller) => {
                //     console.log('Call Id: ', callID);
                //     console.log('Caller: ', caller);
                // },
                // onOutgoingCallTimeout: (callID, callees) => {
                //     console.log('Call Id: ', callID);
                //     console.log('Caller: ', callees);
                // },
            });
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
                            fullname: currentCoach?.fullname,
                        },
                        [chatId + '.date']: serverTimestamp(),
                    });

                    await updateDoc(doc(db, 'userChats', currentCoach?.uid), {
                        [chatId + '.userInfo']: {
                            uid: currentUser?.Id,
                            username: currentUser?.Username,
                            email: currentUser?.email,
                            avatar: currentUser?.Avatar,
                            fullname: currentUser?.Fullname,
                        },
                        [chatId + '.date']: serverTimestamp(),
                    });
                }
            };
            handleSelect();
        }
    });

    useEffect(() => {
        const getChats = () => {
            if (currentUser?.Id) {
                const unsub = onSnapshot(doc(db, 'userChats', currentUser?.Id), (doc) => {
                    setChats(doc.data());
                    setIsLoading(false);
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

    useEffect(() => {
        if (!chatId && currentUser?.role === 'COACH') {
            navigate(`/coach/${currentUser.Id}/messages`);
        }
    });
    const handleChat = () => {
        navigate(`/client/${currentUser.Id}/all-coaches`);
    };
    const handleBack = () => {
        navigate(`/coach/${currentUser.Id}/messages`);
        dispatch(changeUser({ currentUser: '', payload: '' }));
    };
    return currentUser?.role === 'COACH' ? (
        <div className={cx('wrapper', { wrapperCoach: currentUser?.role === 'COACH' })}>
            <div className={cx('container', { containerCoach: currentUser?.role === 'COACH' })}>
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
                                <span>Quay lại</span>
                            </div>

                            <span style={{ borderLeft: '2px solid lightgray', paddingLeft: '5px', color: 'white' }}>
                                {user.fullname}
                            </span>
                        </span>

                        {status.isOnline ? (
                            <div className={cx('call-and-status')}>
                                <div
                                    className={cx('chatIcons')}
                                    onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
                                >
                                    <BsCameraVideoFill className={cx('call-icon')} />
                                </div>
                                <div className={cx('status', 'online')}>
                                    <BsDot className={cx('icon')} />
                                </div>
                            </div>
                        ) : (
                            <div className={cx('status', 'offline')}>
                                <BsDot className={cx('icon')} />
                            </div>
                        )}
                    </div>
                    <Messages />
                    <Input />
                </div>
            </div>
        </div>
    ) : !chatId ? (
        <div className={cx('chat', { chatModal: !chatId })}>
            {!isLoading ? (
                Object.entries(chats).length === 0 ? (
                    <h3
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: '500',
                            fontSize: '24px',
                            color: 'gray',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <span style={{ color: '#1e62af', cursor: 'pointer' }} onClick={handleChat}>
                            Vào đây
                        </span>
                        &nbsp;<span>để bắt đầu trò chuyện với huấn luyện viên</span>
                    </h3>
                ) : (
                    <h3
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: '500',
                            fontSize: '24px',
                            color: 'gray',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Chọn huấn luyện viên để trò chuyện
                    </h3>
                )
            ) : (
                <div></div>
            )}
        </div>
    ) : (
        <div className={cx('chat', { chatClient: currentUser?.role !== 'COACH' && !coachId })}>
            <div className={cx('chatInfo', { chatInfoClient: coachId })}>
                <span className={cx('fullname')}>{user.fullname}</span>
                {status.isOnline ? (
                    <div className={cx('call-and-status')}>
                        <div
                            className={cx('chatIcons')}
                            onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
                        >
                            <BsCameraVideoFill className={cx('call-icon')} />
                        </div>
                        <div className={cx('status', 'online')}>
                            <BsDot className={cx('icon')} />
                        </div>
                    </div>
                ) : (
                    <div className={cx('status', 'offline')}>
                        <BsDot className={cx('icon')} />
                    </div>
                )}
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;

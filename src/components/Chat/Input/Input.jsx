import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { db, storage } from '~/firebase';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { GrFormClose } from 'react-icons/gr';

import { v4 as uuid } from 'uuid';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

const Input = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { chatId, user } = useSelector((state) => state.chat);
    const [text, setText] = useState('');
    const [imgPreview, setImgPreview] = useState(null);
    const [img, setImg] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (img) {
            setLoading(true);
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                'state_changed',
                () => {},
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text: text,
                                senderId: currentUser.Id,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                        setLoading(false);
                        await updateDoc(doc(db, 'userChats', currentUser.Id), {
                            [chatId + '.lastMessage']: {
                                text,
                                img: downloadURL,
                            },
                            [chatId + '.date']: serverTimestamp(),
                        });
                        if (!user.uid) {
                            await updateDoc(doc(db, 'userChats', user), {
                                [chatId + '.lastMessage']: {
                                    text,
                                    img: downloadURL,
                                },
                                [chatId + '.date']: serverTimestamp(),
                            });
                        } else {
                            await updateDoc(doc(db, 'userChats', user.uid), {
                                [chatId + '.lastMessage']: {
                                    text,
                                    img: downloadURL,
                                },
                                [chatId + '.date']: serverTimestamp(),
                            });
                        }
                    });
                },
            );
            setText('');
        } else if (video) {
            setLoading(true);
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, video);

            uploadTask.on(
                'state_changed',
                () => {},
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text: text,
                                senderId: currentUser.Id,
                                date: Timestamp.now(),
                                video: downloadURL,
                            }),
                        });
                        setLoading(false);
                        await updateDoc(doc(db, 'userChats', currentUser.Id), {
                            [chatId + '.lastMessage']: {
                                text,
                                video: downloadURL,
                            },
                            [chatId + '.date']: serverTimestamp(),
                        });
                        if (!user.uid) {
                            await updateDoc(doc(db, 'userChats', user), {
                                [chatId + '.lastMessage']: {
                                    text,
                                    video: downloadURL,
                                },
                                [chatId + '.date']: serverTimestamp(),
                            });
                        } else {
                            await updateDoc(doc(db, 'userChats', user.uid), {
                                [chatId + '.lastMessage']: {
                                    text,
                                    video: downloadURL,
                                },
                                [chatId + '.date']: serverTimestamp(),
                            });
                        }
                    });
                },
            );
            setText('');
        } else {
            updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.Id,
                    date: Timestamp.now(),
                }),
            });
            setText('');
            await updateDoc(doc(db, 'userChats', currentUser.Id), {
                [chatId + '.lastMessage']: {
                    text,
                },
                [chatId + '.date']: serverTimestamp(),
            });
            if (!user.uid) {
                await updateDoc(doc(db, 'userChats', user), {
                    [chatId + '.lastMessage']: {
                        text,
                    },
                    [chatId + '.date']: serverTimestamp(),
                });
            } else {
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [chatId + '.lastMessage']: {
                        text,
                    },
                    [chatId + '.date']: serverTimestamp(),
                });
            }
        }

        setImg(null);
        setVideo(null);
        handleFileChange();
    };

    const handleFileChange = () => {
        const fileInput = document.getElementById('file');
        if (fileInput) {
            fileInput.value = '';
        }
    };
    const handleCloseImgPreview = () => {
        setImg(null);
        setVideo(null);
        setImgPreview(null);
        handleFileChange();
    };
    const handleSelectImg = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        const mimeType = file.type;
        const isPhoto = mimeType.startsWith('image/');
        const isVideo = mimeType.startsWith('video/');
        if (isPhoto) {
            setImg(file);
            setImgPreview(URL.createObjectURL(file));
        } else if (isVideo) {
            setVideo(file);
            setImgPreview(URL.createObjectURL(file));
        }
    };
    const handleKey = (e) => {
        e.code === 'Enter' && handleSend();
    };
    return (
        <div className={cx('input')}>
            {imgPreview && (
                <div
                    className={cx('preview-container')}
                    style={{
                        display: img || video ? 'flex' : 'none',
                        position: 'absolute',
                        transform: 'translateY(-85%)',
                    }}
                >
                    <button
                        className={cx('close-preview')}
                        onClick={handleCloseImgPreview}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: 'transparent',
                            zIndex: '999999',
                        }}
                    >
                        <GrFormClose style={{ fontSize: '24px' }} />
                    </button>
                    {video ? (
                        <video
                            className={cx('preview')}
                            src={imgPreview}
                            alt="Preview"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                            controls
                        />
                    ) : (
                        <img
                            className={cx('preview')}
                            src={imgPreview}
                            alt="Preview"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    )}
                </div>
            )}

            <input
                type="text"
                placeholder="Tin nhắn"
                onKeyDown={handleKey}
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className={cx('send')}>
                <input type="file" style={{ display: 'none' }} id="file" onChange={handleSelectImg} />
                <label htmlFor="file">
                    <BsCardImage className={cx('icon')} />
                </label>
                <button onClick={handleSend} disabled={!text && !img && !video}>
                    {loading ? <Spinner /> : 'Gửi'}
                </button>
            </div>
        </div>
    );
};

export default Input;

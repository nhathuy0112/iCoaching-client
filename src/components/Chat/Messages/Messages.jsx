import React, { useEffect, useState } from 'react';
import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import Message from '../Message/Message';
import { db } from '~/firebase';
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const chatId = useSelector((state) => state.chat.chatId);

    const { coachId } = useParams();

    useEffect(() => {
        if (chatId) {
            const unSub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
            });
            return () => {
                unSub();
            };
        } else {
            return;
        }
    }, [chatId]);

    return (
        <div className={cx('messages', { messagesClient: coachId })}>
            {messages?.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
};

export default Messages;

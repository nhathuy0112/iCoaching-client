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
        }
    }, [chatId]);

    // console.log(messages);
    // messages.forEach((message) => console.log(message.date.toDate()));

    const filteredMessagesByDate = messages?.reduce((acc, message) => {
        // Extract the date from the message and convert it to the desired format
        const date = message?.date?.toDate();
        const formattedDate = new Intl.DateTimeFormat(['ban', 'id'], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date);

        // Find the existing subMessage array for the current date, or create a new one if it doesn't exist
        let subMessages = acc.find((obj) => obj.date === formattedDate)?.subMessages;
        if (!subMessages) {
            subMessages = [];
            acc.push({ date: formattedDate, subMessages });
        }

        const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hourCycle: 'h23',
        }).format(date);

        // Add the message to the subMessage array
        subMessages.push({
            id: message.id,
            senderId: message.senderId,
            text: message.text,
            time: formattedTime,
            img: message.img,
            video: message.video,
        });

        return acc;
    }, []);

    // console.log(filteredMessagesByDate);

    return (
        <div className={cx('messages', { messagesClient: coachId })}>
            {/* {messages?.map((m) => (
                <Message message={m} key={m.id} />s
            ))} */}
            {filteredMessagesByDate &&
                filteredMessagesByDate.map((filteredMessage, index) => (
                    <div key={index}>
                        <h3 className={cx('date-messages')}>
                            <span>{filteredMessage.date}</span>
                        </h3>
                        {filteredMessage.subMessages.map((message) => (
                            <Message message={message} key={message.id} />
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default Messages;

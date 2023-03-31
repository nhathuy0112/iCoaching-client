import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Home from '~/components/Chat/Home';

const Messages = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/client/${currentUser.Id}/all-messages`);
            }
        }
    }, [id, currentUser, navigate]);
    return <Home />;
};

export default Messages;

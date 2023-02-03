import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAsync, refreshAsync } from '~/features/userSlice';
import { getLocalStorage } from '~/utils/localStorage';

const CoachHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (currentUser === null) navigate('/');
    }, [currentUser, navigate]);

    useEffect(() => {
        const autoRefreshToken = async () => {
            if (currentUser) {
                let currentDate = new Date();
                let expTime = currentUser.exp;
                if (expTime * 1000 < currentDate.getTime()) {
                    dispatch(
                        refreshAsync({
                            accessToken: getLocalStorage('auth').accessToken,
                            refreshToken: getLocalStorage('auth').refreshToken,
                        }),
                    );
                }
            }
        };
        autoRefreshToken();
    }, [dispatch, currentUser]);

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logoutAsync({ currentRefreshToken: getLocalStorage('auth').refreshToken }));
        // console.log('click log out');
    };

    return (
        <div>
            <h1>{currentUser && `Welcome user ${currentUser.email}, Your role is: ${currentUser.role}`}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default CoachHome;

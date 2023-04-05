import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const RoleGuard = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const pathRole = pathname.split('/')[1];
    const currentUserRole = currentUser?.role;
    const currentUserRoleLowerCase = currentUserRole?.toLowerCase();

    useEffect(() => {
        if (currentUser) {
            if (pathRole !== currentUserRoleLowerCase) {
                let url = '';
                switch (currentUserRole) {
                    case 'CLIENT':
                        url = `/${currentUserRoleLowerCase}/${currentUser?.Id}`;
                        break;
                    case 'COACH':
                        url = `/${currentUserRoleLowerCase}/${currentUser?.Id}/verify`;
                        break;
                    case 'ADMIN':
                        url = `/${currentUserRoleLowerCase}/${currentUser?.Id}/all-coaches`;
                        break;
                    case 'SUPER_ADMIN':
                        url = `/${currentUserRoleLowerCase}/${currentUser?.Id}/list-admin`;
                        break;
                    default:
                        url = `/`;
                }
                navigate(url);
            } else {
                return;
            }
        }
    }, [currentUser, pathname, navigate, currentUserRole, currentUserRoleLowerCase, pathRole]);

    return <div>{children}</div>;
};

export default RoleGuard;

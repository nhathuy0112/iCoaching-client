import PropTypes from 'prop-types';
import styles from './AuthLayout.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '~/layouts/components/Sidebar';
import { coachNavLinks, adminNavLinks, superAdminNavLinks } from '~/config/navLink';
import { getUserAvatarAsync } from '~/features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const cx = classNames.bind(styles);

const AuthLayout = ({ children }) => {
    const { currentUser, avatar } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [links, setLinks] = useState([]);
    const url = window.location.href;
    const path = url.split('/');
    const headerPath = path[5];

    useEffect(() => {
        dispatch(getUserAvatarAsync());
    }, [dispatch, avatar]);

    useEffect(() => {
        if (currentUser) {
            setLinks(handleRenderNavLinks(currentUser?.role));
        } else {
            setLinks([]);
        }
    }, [currentUser]);

    const handleRenderNavLinks = (role) => {
        switch (role) {
            case 'COACH':
                return coachNavLinks;
            case 'ADMIN':
                return adminNavLinks;
            case 'SUPER_ADMIN':
                return superAdminNavLinks;
            default:
                return [];
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Sidebar links={links} />
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h3>
                        {links.map((link) => {
                            if (link.url === headerPath) return link.name;
                            return '';
                        })}
                    </h3>
                    <div className={cx('info')}>
                        <span className={cx('name')}>{currentUser?.Fullname}</span>
                        <div className={cx('avatar-wrapper')}>
                            {avatar ? (
                                <img className={cx('avatar')} src={avatar} alt="user-avatar" />
                            ) : (
                                <FaUserCircle className={cx('avatar')} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthLayout;

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
    const { currentUser, avatar, profile } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [links, setLinks] = useState([]);

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
            <div className={cx('header')}>
                <div className={cx('logo')}>
                    <img src={require('../../assets/images/Logo-black.png')} alt="logo" />
                    <span>iCoaching</span>
                </div>
                <div className={cx('info')}>
                    <span className={cx('name')}>{profile.fullname}</span>
                    <div className={cx('avatar-wrapper')}>
                        {avatar ? (
                            <img className={cx('avatar')} src={avatar} alt="user-avatar" />
                        ) : (
                            <FaUserCircle className={cx('avatar')} />
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <Sidebar links={links} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthLayout;

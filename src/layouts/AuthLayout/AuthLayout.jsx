import PropTypes from 'prop-types';
import styles from './AuthLayout.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '~/layouts/components/Sidebar';
import { clientNavLinks, coachNavLinks, adminNavLinks, superAdminNavLinks } from '~/config/navLink';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const cx = classNames.bind(styles);

const AuthLayout = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [links, setLinks] = useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        if (currentUser) {
            setLinks(handleRenderNavLinks(currentUser?.role));
            setRole(handleRenderRole(currentUser?.role));
        } else {
            setLinks([]);
            setRole('');
        }
    }, [currentUser]);

    const handleRenderNavLinks = (role) => {
        switch (role) {
            case 'CLIENT':
                return clientNavLinks;
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

    const handleRenderRole = (role) => {
        switch (role) {
            case 'CLIENT':
                return 'Khách hàng';
            case 'COACH':
                return 'Huấn luyện viên';
            case 'ADMIN':
                return 'Kiểm duyệt viên';
            case 'SUPER_ADMIN':
                return 'Quản trị Kiểm duyệt viên';
            default:
                return '';
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Sidebar links={links} />
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h3 className={cx('welcome')}>
                        Xin chào, bạn là <span className={cx('role')}>{role}</span> của hệ thống
                    </h3>
                    <div className={cx('info')}>
                        <span className={cx('name')}>{currentUser?.Fullname}</span>
                        <div className={cx('avatar-wrapper')}>
                            <FaUserCircle className={cx('avatar')} />
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

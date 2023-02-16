import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutAsync } from '~/features/userSlice';
import { getLocalStorage } from '~/utils/localStorage';

import { BiLogOut } from 'react-icons/bi';

const cx = classNames.bind(styles);

const Sidebar = ({ links }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (!currentUser) navigate('/');
    }, [currentUser, navigate]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutAsync({ currentRefreshToken: getLocalStorage('auth').refreshToken }));
    };

    return (
        <div className={cx('container')}>
            <h1 className={cx('logo')}>iCoaching</h1>
            <ul className={cx('link-list')}>
                {links.map((link, index) => (
                    <li key={index} className={cx('link-item')}>
                        <NavLink
                            to={`/${currentUser?.role.toLowerCase()}/${currentUser?.Id}/${link.url}`}
                            className={({ isActive }) => (isActive ? cx('link-url', 'active') : cx('link-url'))}
                        >
                            <span className={cx('link-icon')}>{link.icon}</span>
                            <span className={cx('link-name')}>{link.name}</span>
                        </NavLink>
                    </li>
                ))}
                <li className={cx('link-item')}>
                    <button id={cx('logout-btn')} onClick={handleLogout}>
                        <span>
                            <BiLogOut />
                        </span>
                        <span className={cx('action')}>Đăng xuất</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

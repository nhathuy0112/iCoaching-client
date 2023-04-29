import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserProfileAsync, logoutAsync } from '~/features/userSlice';
import { getLocalStorage } from '~/utils/localStorage';
import { BiLogOut } from 'react-icons/bi';
import { coachNavLinks } from '~/config/navLink';
import { changeUser, updateUserOnlineStatus } from '~/features/chatSlice';

const cx = classNames.bind(styles);

const Sidebar = ({ links }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, isVerified } = useSelector((state) => state.user);
    const [disabledLinks, setDisabledLinks] = useState([]);

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserProfileAsync());
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (!currentUser) navigate('/');
        else if (currentUser.role === 'COACH') {
            // Get list of Coach navLinks
            const coachLinks = [...coachNavLinks];
            if (!isVerified) {
                // Find the links want to disable
                const linksToDisable = ['my-clients', 'coaching-requests', 'my-courses'];

                // Disable the links
                const disabledLinks = coachLinks.filter((link) => linksToDisable.includes(link.url));
                setDisabledLinks(disabledLinks);
            } else {
                setDisabledLinks([]);
            }
        }
    }, [currentUser, navigate, isVerified]);

    const handleLogout = () => {
        dispatch(
            logoutAsync({
                currentRefreshToken: getLocalStorage('auth').refreshToken,
                userId: currentUser.Id,
                successCallback: () => {
                    window.location.href = '/';
                },
            }),
        );
    };

    return (
        <div className={cx('container')}>
            <ul className={cx('link-list')}>
                {links.map((link, index) => {
                    const isDisabled = disabledLinks.some((disabledLink) => disabledLink.url === link.url);
                    return (
                        <li key={index} className={cx('link-item')}>
                            <NavLink
                                to={`/${currentUser?.role.toLowerCase()}/${currentUser?.Id}/${link.url}`}
                                className={({ isActive }) =>
                                    isActive ? cx('link-url', 'active') : cx('link-url', isDisabled && 'disabled')
                                }
                                disabled={isDisabled}
                            >
                                <span className={cx('link-icon')}>{link.icon}</span>
                                <span className={cx('link-name')}>{link.name}</span>
                            </NavLink>
                        </li>
                    );
                })}
                <li className={cx('link-item')}>
                    <div id={cx('logout-btn')} onClick={handleLogout}>
                        <span>
                            <BiLogOut />
                        </span>
                        <span className={cx('action')}>Đăng xuất</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

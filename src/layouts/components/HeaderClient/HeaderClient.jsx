import { useEffect } from 'react';
import styles from './HeaderClient.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IoMdGift, IoMdSettings } from 'react-icons/io';
import { logoutAsync, getUserAvatarAsync, getUserProfileAsync } from '~/features/userSlice';
import { getLocalStorage } from '~/utils/localStorage';
import { BiLogOut } from 'react-icons/bi';
import { changeUser, updateUserOnlineStatus } from '~/features/chatSlice';

const cx = classNames.bind(styles);

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, avatar, profile } = useSelector((state) => state.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(
            logoutAsync({
                currentRefreshToken: getLocalStorage('auth').refreshToken,
                // successCallback: () => {

                //     window.location.href = '/';
                // },
            }),
        );
        dispatch(changeUser({ currentUser: '', payload: '' }));
        dispatch(updateUserOnlineStatus(currentUser.Id));
    };

    useEffect(() => {
        dispatch(getUserAvatarAsync());
    }, [dispatch, avatar]);

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserProfileAsync());
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleSetNull = () => {
        dispatch(changeUser({ currentUser: '', payload: '' }));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('navbar')}>
                    <div className={cx('navbar-content')}>
                        <div className={cx('logo')} onClick={() => navigate(`/client/${currentUser?.Id}`)}>
                            <img src={require('../../../assets/images/Logo.png')} alt="logo" />
                            <span className={cx('name')}>iCoaching</span>
                        </div>
                        {currentUser && (
                            <>
                                <div className={cx('nav-link')}>
                                    <NavLink
                                        to={`/${currentUser?.role.toLowerCase()}/${currentUser?.Id}/training-requests`}
                                        className={({ isActive }) =>
                                            isActive ? cx('nav-link-item', 'active') : cx('nav-link-item')
                                        }
                                    >
                                        Yêu cầu tập luyện
                                    </NavLink>
                                    <NavLink
                                        to={`/${currentUser?.role.toLowerCase()}/${currentUser?.Id}/ongoing-courses`}
                                        className={({ isActive }) =>
                                            isActive ? cx('nav-link-item', 'active') : cx('nav-link-item')
                                        }
                                    >
                                        Đang tập luyện
                                    </NavLink>
                                    <NavLink
                                        to={`/${currentUser?.role.toLowerCase()}/${currentUser?.Id}/pending-courses`}
                                        className={({ isActive }) =>
                                            isActive ? cx('nav-link-item', 'active') : cx('nav-link-item')
                                        }
                                    >
                                        Đợi hoàn thành
                                    </NavLink>
                                    <NavLink
                                        to={`/${currentUser?.role.toLowerCase()}/${currentUser?.Id}/training-history`}
                                        className={({ isActive }) =>
                                            isActive ? cx('nav-link-item', 'active') : cx('nav-link-item')
                                        }
                                    >
                                        Lịch sử tập luyện
                                    </NavLink>
                                    <NavLink
                                        to={`/${currentUser?.role.toLowerCase()}/${currentUser?.Id}/all-messages`}
                                        className={({ isActive }) =>
                                            isActive ? cx('nav-link-item', 'active') : cx('nav-link-item')
                                        }
                                        onClick={handleSetNull}
                                    >
                                        Tin nhắn
                                    </NavLink>
                                </div>
                                <Tippy
                                    className={cx('drop-link')}
                                    placement="bottom"
                                    arrow={false}
                                    interactive={true}
                                    content={
                                        <>
                                            <div className={cx('arrow')}></div>
                                            <div className={cx('avatar-link')}>
                                                <Link
                                                    className={cx('avatar-link-item')}
                                                    to={`/client/${currentUser?.Id}/account-information`}
                                                >
                                                    <span className={cx('icon')}>
                                                        <IoMdSettings />
                                                    </span>
                                                    <span className={cx('title')}>Thông tin tài khoản</span>
                                                </Link>
                                                <Link
                                                    className={cx('avatar-link-item')}
                                                    to={`/client/${currentUser?.Id}/vouchers`}
                                                >
                                                    <span className={cx('icon')}>
                                                        <IoMdGift />
                                                    </span>
                                                    <span className={cx('title')}>Mã giảm giá</span>
                                                </Link>
                                                <div className={cx('avatar-link-item')} onClick={handleLogout}>
                                                    <span className={cx('icon')}>
                                                        <BiLogOut />
                                                    </span>
                                                    <span className={cx('title')}>Đăng xuất</span>
                                                </div>
                                            </div>
                                        </>
                                    }
                                >
                                    <div className={cx('info')}>
                                        <span className={cx('name')}>{profile?.fullname}</span>
                                        <div className={cx('avatar-wrapper')}>
                                            {avatar ? (
                                                <img className={cx('avatar')} src={avatar} alt="user-avatar" />
                                            ) : (
                                                <FaUserCircle className={cx('avatar')} />
                                            )}
                                        </div>
                                    </div>
                                </Tippy>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

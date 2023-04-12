import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import Login from '~/auth/Login';
import Register from '~/auth/Register';
import ForgotPassword from '~/auth/ForgotPassword';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Header = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [forgotOpen, setForgotOpen] = useState(false);
    const navigate = useNavigate();
    const { currentUser, isLoggedIn } = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginOpen(true);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setRegisterOpen(true);
    };

    useEffect(() => {
        if (isLoggedIn && currentUser) {
            switch (currentUser.role) {
                case 'CLIENT':
                    navigate(`/client/${currentUser.Id}`);
                    break;
                case 'COACH':
                    navigate(`/coach/${currentUser.Id}/verify`);
                    break;
                case 'ADMIN':
                    navigate(`/admin/${currentUser.Id}/all-coaches`);
                    break;
                case 'SUPER_ADMIN':
                    navigate(`/super_admin/${currentUser.Id}/list-admin`);
                    break;
                default:
                    navigate('/');
            }
        }
    }, [currentUser, isLoggedIn, navigate]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('navbar')}>
                    <div className={cx('navbar-content')}>
                        <div className={cx('logo')} onClick={() => navigate('/')}>
                            <img src={require('../../../assets/images/Logo.png')} alt="logo" />
                            <span className={cx('name')}>iCoaching</span>
                        </div>
                        <div className={cx('auth-btn')}>
                            <button onClick={handleLogin} id={cx('login')}>
                                Đăng nhập
                            </button>
                            <Login
                                open={loginOpen}
                                setLoginOpen={setLoginOpen}
                                setRegisterOpen={setRegisterOpen}
                                setForgotOpen={setForgotOpen}
                            ></Login>
                            <button onClick={handleRegister} id={cx('register')}>
                                Đăng ký
                            </button>
                            <Register
                                open={registerOpen}
                                setLoginOpen={setLoginOpen}
                                setRegisterOpen={setRegisterOpen}
                            ></Register>
                            <ForgotPassword
                                open={forgotOpen}
                                setForgotOpen={setForgotOpen}
                                setLoginOpen={setLoginOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

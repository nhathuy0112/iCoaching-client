import { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import Login from '~/auth/Login';
import Register from '~/auth/Register';
import ForgotPassword from '~/auth/ForgotPassword';
const cx = classNames.bind(styles);

const Header = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [forgotOpen, setForgotOpen] = useState(false);

    const handleLogin = (e) => {
        setLoginOpen(true);
    };

    const handleRegister = (e) => {
        setRegisterOpen(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('navbar')}>
                    <div className={cx('navbar-content')}>
                        <div className={cx('logo')}>
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

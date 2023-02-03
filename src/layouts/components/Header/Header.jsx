import { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { AiOutlineSchedule } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';

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
                            <span>iCoaching</span>
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
                <div className={cx('banner-content')}>
                    <div className={cx('slogan-and-train')}>
                        <h1 className={cx('main-slogan')}>
                            <span style={{ color: 'var(--primary-color)' }}>Sức khỏe</span> <br /> là lựa chọn, không
                            phải điều bí ẩn của sự ngẫu nhiên
                        </h1>
                        <h5 className={cx('sub-slogan')}>
                            Sức khỏe không phải là thứ chúng ta có thể mua. Tuy nhiên, nó có thể là một tài khoản tiết
                            kiệm cực kỳ giá trị.
                        </h5>
                        <button className={cx('train-btn')}>tập luyện ngay</button>
                    </div>
                    <div className={cx('services')}>
                        <div className={cx('service-list')}>
                            <div className={cx('service-item')}>
                                <div className={cx('service-icon')}>
                                    <AiOutlineSchedule />
                                </div>
                                <div className={cx('service-content')}>
                                    <span className={cx('description')}>Thời gian biểu khoa học</span>
                                    <span className={cx('sub-description')}>Dinh dưỡng & luyện tập </span>
                                </div>
                            </div>
                            <li className={cx('service-item')}>
                                <div className={cx('service-icon')}>
                                    <CgGym />
                                </div>
                                <div className={cx('service-content')}>
                                    <span className={cx('description')}>Huấn luyện</span>
                                    <span className={cx('sub-description')}>Đăng ký trực tuyến</span>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

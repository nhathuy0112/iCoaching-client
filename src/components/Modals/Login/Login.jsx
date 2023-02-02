import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import Modal from '../Modal';
const cx = classNames.bind(styles);

const Login = ({ open, setLoginOpen, setRegisterOpen, setForgotOpen }) => {
    const switchForgot = (e) => {
        setLoginOpen(false);
        setForgotOpen(true);
    };

    const switchRegister = (e) => {
        setLoginOpen(false);
        setRegisterOpen(true);
    };
    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal show={open} onClose={() => setLoginOpen(false)}>
                    <div className={cx('imgWrapper')}>
                        <h1>iCoaching</h1>
                        <img src={require('~/assets/images/modal-bg.png')} alt="" />
                    </div>

                    <form id={cx('loginForm')}>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.3,
                                    duration: 0.3,
                                },
                            }}
                        >
                            <h1 className={cx('alignCenter')}>Đăng nhập</h1>
                            <label>Địa chỉ email</label>
                            <input type="email" placeholder="Nhập địa chỉ email" />
                            <label>Mật khẩu</label>
                            <input type="password" placeholder="Nhập mật khẩu" />
                            <div>
                                <input className={cx('checkbox')} type="checkbox" /> Ghi nhớ mật khẩu
                                <button id={cx('forgotBtn')} onClick={switchForgot}>
                                    Quên mật khẩu?
                                </button>
                            </div>
                            <div>
                                <button type="submit" id={cx('submitBtn')} className={cx('alignCenter')}>
                                    Đăng nhập
                                </button>
                                <p className={cx('alignCenter')}>
                                    Chưa có tài khoản?
                                    <button onClick={switchRegister} id={cx('switchBtn')}>
                                        Đăng ký
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Login;

import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { BsArrowLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';

import Modal from '../Modal';

const cx = classNames.bind(styles);

const Login = ({ open, setForgotOpen, setLoginOpen }) => {
    const switchLogin = (e) => {
        setForgotOpen(false);
        setLoginOpen(true);
    };

    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal show={open} onClose={() => setForgotOpen(false)}>
                    <div className={cx('imgWrapper')}>
                        <h1>iCoaching</h1>
                        <img src={require('~/assets/images/modal-bg.png')} alt="" />
                    </div>

                    <form id={cx('forgotForm')}>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.2,
                                    duration: 0.3,
                                },
                            }}
                        >
                            <button id={cx('backBtn')} onClick={switchLogin}>
                                <BsArrowLeft />
                            </button>
                            <h1 className={cx('alignCenter')}>Quên mật khẩu</h1>
                            <label>Địa chỉ email</label>
                            <input type="email" placeholder="Nhập địa chỉ email" />
                            <div>
                                <button type="submit" id={cx('submitBtn')} className={cx('alignCenter')}>
                                    Gửi
                                </button>
                                <p className={cx('alignCenter')}>
                                    Chưa nhận được mail?
                                    <button id={cx('resendBtn')}> Gửi lại</button>
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

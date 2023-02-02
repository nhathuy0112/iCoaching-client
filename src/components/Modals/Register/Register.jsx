import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import Modal from '../Modal';

const cx = classNames.bind(styles);

const Register = ({ open, setLoginOpen, setRegisterOpen }) => {
    const switchLogin = (e) => {
        setRegisterOpen(false);
        setLoginOpen(true);
    };
    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal show={open} onClose={() => setRegisterOpen(false)}>
                    <div className={cx('imgWrapper')}>
                        <h1>iCoaching</h1>
                        <img src={require('~/assets/images/modal-bg.png')} alt="" />
                    </div>

                    <form id={cx('registerForm')}>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.3,
                                    duration: 0.3,
                                },
                            }}
                        >
                            <h1 className={cx('alignCenter')}>Đăng ký tài khoản</h1>
                            <label>Họ và Tên</label>
                            <input type="text" placeholder="Nhập Họ và Tên" />
                            <label>Địa chỉ email</label>
                            <input type="email" placeholder="Nhập địa chỉ email" />
                            <label>Số điện thoại</label>
                            <input type="tel" placeholder="Nhập số điện thoại" />
                            <div className={cx('col2')}>
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="Nhập mật khẩu" />
                            </div>
                            <div className={cx('col2', 'f-right')}>
                                <label>Xác nhận mật khẩu</label>
                                <input type="password" placeholder="Xác nhận mật khẩu" />
                            </div>
                            <div>
                                <input className={cx('checkbox')} type="checkbox" /> Đăng ký trở thành huấn luyện viên{' '}
                                <br />
                                <input className={cx('checkbox')} type="checkbox" /> Tôi đồng ý với các điều khoản
                            </div>
                            <div>
                                <button type="submit" id={cx('submitBtn')} className={cx('alignCenter')}>
                                    Đăng ký
                                </button>
                                <p onClick={switchLogin} className={cx('alignCenter')}>
                                    Đã có tài khoản?
                                    <button onClick={switchLogin} id={cx('switchBtn')}>
                                        Đăng nhập
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

export default Register;

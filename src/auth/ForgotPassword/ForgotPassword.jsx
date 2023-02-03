import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { BsArrowLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import Modal from '~/components/Modals';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { forgotAsync } from './../../features/userSlice';

const cx = classNames.bind(styles);

const Login = ({ open, setForgotOpen, setLoginOpen }) => {
    const [isResetPassword, setIsResetPassword] = useState(false);

    const switchLogin = (e) => {
        setForgotOpen(false);
        setLoginOpen(true);
    };

    const dispatch = useDispatch();

    const { register, getValues, handleSubmit, resetField } = useForm();

    const handleForgot = (data) => {
        setIsResetPassword(true);
        dispatch(forgotAsync(data.email));
        setTimeout(() => {
            setIsResetPassword(false);
            resetField('email');
        }, 20000);
    };

    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal show={open} onClose={() => setForgotOpen(false)}>
                    <div className={cx('imgWrapper')}>
                        <h1>iCoaching</h1>
                        <img src={require('~/assets/images/modal-bg.png')} alt="" />
                    </div>

                    <form id={cx('forgotForm')} onSubmit={handleSubmit(handleForgot)}>
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
                            <input type="email" placeholder="Nhập địa chỉ email" {...register('email')} />
                            {isResetPassword && (
                                <span style={{ color: 'var(--primary-color)' }}>
                                    Truy cập email <span style={{ color: 'red' }}>{getValues('email')}</span> để khôi
                                    phục mật khẩu
                                </span>
                            )}
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

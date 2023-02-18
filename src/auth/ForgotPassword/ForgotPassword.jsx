import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { BsArrowLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import Modal from '~/components/Modals';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { forgotAsync, resetAuth } from './../../features/userSlice';
import ErrorMessage from '~/components/ErrorMessage';

const cx = classNames.bind(styles);

const ForgotPassword = ({ open, setForgotOpen, setLoginOpen }) => {
    const switchLogin = () => {
        setForgotOpen(false);
        dispatch(resetAuth());
        setLoginOpen(true);
    };

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleForgot = (data) => {
        dispatch(forgotAsync(data.email));
    };

    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal show={open} onClose={() => setForgotOpen(false)}>
                    <div className={cx('content')}>
                        <div className={cx('img-wrapper')}>
                            <h1>iCoaching</h1>
                            <img src={require('~/assets/images/modal-bg.png')} alt="" />
                        </div>
                        <form id={cx('forgot-form')} onSubmit={handleSubmit(handleForgot)}>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.2,
                                    },
                                }}
                            >
                                <button id={cx('back-btn')} onClick={switchLogin}>
                                    <BsArrowLeft />
                                </button>
                                <h1 className={cx('align-center')}>Quên mật khẩu</h1>
                                <label>Địa chỉ email</label>
                                <input
                                    type="email"
                                    placeholder="Nhập địa chỉ email"
                                    {...register('email', { required: true })}
                                />
                                {errors?.email?.type === 'required' && (
                                    <ErrorMessage message="Email không được để trống !" />
                                )}
                                {/* {isResetPassword && (
                                    <span style={{ color: 'var(--primary-color)' }}>
                                        Truy cập email <span style={{ color: 'red' }}>{getValues('email')}</span> để khôi
                                        phục mật khẩu
                                    </span>
                                )} */}
                                {error && <ErrorMessage message={error} />}
                                <div>
                                    <button type="submit" id={cx('submit-btn')} className={cx('align-center')}>
                                        Gửi
                                    </button>
                                    <p className={cx('align-center')}>
                                        Chưa nhận được mail?
                                        <button id={cx('resend-btn')}> Gửi lại</button>
                                    </p>
                                </div>
                            </motion.div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ForgotPassword;

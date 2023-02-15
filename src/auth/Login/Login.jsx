import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '~/components/Modals';
import { loginAsync } from '~/features/userSlice';
import ErrorMessage from './../../components/ErrorMessage/ErrorMessage';

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

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const { currentUser, isLoggedIn, error } = useSelector((state) => state.user);
    const [errorMessage, setErrorMessage] = useState(null);

    // console.log('Error Message: ', errorMessage);
    // console.log('error from state: ', error);

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    }, [error]);

    useEffect(() => {
        if (isLoggedIn && currentUser) {
            switch (currentUser.role) {
                case 'CLIENT':
                    navigate(`/client/${currentUser.Id}`);
                    break;
                case 'COACH':
                    navigate(`/coach/${currentUser.Id}`);
                    break;
                case 'SUPER_ADMIN':
                    break;
                default:
                    return;
            }
        }
    }, [currentUser, isLoggedIn, navigate]);

    const handleLogin = (data) => {
        dispatch(loginAsync({ username: data.username, password: data.password }));
        setErrorMessage(null);
    };

    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal show={open} onClose={() => setLoginOpen(false)}>
                    <div className={cx('img-wrapper')}>
                        <h1>iCoaching</h1>
                        <img src={require('~/assets/images/modal-bg.png')} alt="" />
                    </div>

                    <form id={cx('login-form')} onSubmit={handleSubmit(handleLogin)}>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.2,
                                },
                            }}
                        >
                            <h1 className={cx('align-center')}>Đăng nhập</h1>
                            <label>Tài khoản</label>
                            <input
                                type="text"
                                placeholder="Nhập tài khoản"
                                {...register('username', { required: true })}
                            />
                            {errors?.username?.type === 'required' && (
                                <ErrorMessage message="Tài khoản không được để trống !" />
                            )}

                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                {...register('password', { required: true })}
                            />
                            {errors?.password?.type === 'required' && (
                                <ErrorMessage message="Mật khẩu không được để trống !" />
                            )}
                            {errorMessage && <ErrorMessage message={errorMessage} />}
                            <div>
                                <button id={cx('forgot-btn')} onClick={switchForgot}>
                                    Quên mật khẩu?
                                </button>
                            </div>
                            <div>
                                <button type="submit" id={cx('submit-btn')} className={cx('align-center')}>
                                    Đăng nhập
                                </button>
                                <p className={cx('align-center')}>
                                    Chưa có tài khoản?
                                    <button onClick={switchRegister} id={cx('switch-btn')}>
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

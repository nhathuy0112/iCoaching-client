import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '~/components/Modal';
import { loginAsync, resetAuth } from '~/features/userSlice';
import ErrorMessage from '~/components/ErrorMessage';
import Spinner from '~/components/Spinner/Spinner';

const cx = classNames.bind(styles);
const Login = ({ open, setLoginOpen, setRegisterOpen, setForgotOpen }) => {
    const dispatch = useDispatch();
    const switchForgot = (e) => {
        e.preventDefault();
        setLoginOpen(false);
        dispatch(resetAuth());
        clearErrors();
        setForgotOpen(true);
    };

    const switchRegister = (e) => {
        e.preventDefault();
        setLoginOpen(false);
        dispatch(resetAuth());
        clearErrors();
        setRegisterOpen(true);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm();

    const { error, loading } = useSelector((state) => state.user);

    const handleLogin = (data) => {
        dispatch(loginAsync({ username: data.username, password: data.password }));
    };

    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal
                    show={open}
                    onClose={() => {
                        setLoginOpen(false);
                        reset({ username: '' }, { password: '' });
                        clearErrors();
                    }}
                >
                    <div className={cx('content')}>
                        <div className={cx('img-wrapper')}>
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
                                {error && <ErrorMessage message={error} />}
                                <div>
                                    <p id={cx('forgot-btn')} onClick={switchForgot}>
                                        Quên mật khẩu?
                                    </p>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        id={cx('submit-btn')}
                                        className={cx('align-center')}
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner /> : 'Đăng nhập'}
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
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Login;

import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { BsArrowLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Modal from '~/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { forgotAsync, resetAuth } from './../../features/userSlice';
import ErrorMessage from '~/components/ErrorMessage';
import SuccessMessage from '~/components/SuccessMessage';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

const schema = yup.object({
    email: yup.string().required('Email không được để trống'),
});

const ForgotPassword = ({ open, setForgotOpen, setLoginOpen }) => {
    const dispatch = useDispatch();

    const switchLogin = () => {
        setForgotOpen(false);
        dispatch(resetAuth());
        setLoginOpen(true);
    };

    const { error, message, loading } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const handleForgot = (data) => {
        dispatch(forgotAsync(data.email));
        reset(data);
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
                                <div id={cx('back-btn')} onClick={switchLogin}>
                                    <BsArrowLeft />
                                </div>
                                <h1 className={cx('align-center')}>Quên mật khẩu</h1>
                                <label>Địa chỉ email</label>
                                <input type="email" placeholder="Nhập địa chỉ email" {...register('email')} />
                                {errors.email && <ErrorMessage message={errors.email.message} />}
                                {error && <ErrorMessage message={error} />}
                                {message && <SuccessMessage message={message} />}
                                <div>
                                    <button
                                        type="submit"
                                        id={cx('submit-btn')}
                                        className={cx('align-center')}
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner /> : 'Gửi'}
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

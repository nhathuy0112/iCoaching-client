import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import Modal from '~/components/Modals';
import { useDispatch } from 'react-redux';
import { registerAsync } from '~/features/userSlice';

const cx = classNames.bind(styles);

const Register = ({ open, setLoginOpen, setRegisterOpen }) => {
    const switchLogin = (e) => {
        e.preventDefault();
        setRegisterOpen(false);
        setLoginOpen(true);
    };

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const handleRegister = (data) => {
        if (data.isAgreed) {
            dispatch(
                registerAsync({
                    email: data.email,
                    fullname: data.fullname,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    phone: data.phone,
                    isCoach: data.isCoach ? true : false,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal show={open} onClose={() => setRegisterOpen(false)}>
                    <div className={cx('img-wrapper')}>
                        <h1>iCoaching</h1>
                        <img src={require('~/assets/images/modal-bg.png')} alt="" />
                    </div>

                    <form id={cx('register-form')} onSubmit={handleSubmit(handleRegister)}>
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
                            <h1 className={cx('align-center')}>Đăng ký tài khoản</h1>
                            <label>Họ và Tên</label>
                            <input type="text" placeholder="Nhập Họ và Tên" {...register('fullname')} />
                            <label>Địa chỉ email</label>
                            <input type="email" placeholder="Nhập địa chỉ email" {...register('email')} />
                            <label>Số điện thoại</label>
                            <input type="tel" placeholder="Nhập số điện thoại" {...register('phone')} />
                            <div className={cx('col2')}>
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="Nhập mật khẩu" {...register('password')} />
                            </div>
                            <div className={cx('col2', 'f-right')}>
                                <label>Xác nhận mật khẩu</label>
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    {...register('confirmPassword')}
                                />
                            </div>
                            <div>
                                <input className={cx('checkbox')} type="checkbox" {...register('isCoach')} /> Đăng ký
                                trở thành huấn luyện viên <br />
                                <input className={cx('checkbox')} type="checkbox" {...register('isAgreed')} /> Tôi đồng
                                ý với các điều khoản
                            </div>
                            <div>
                                <button type="submit" id={cx('submit-btn')} className={cx('align-center')}>
                                    Đăng ký
                                </button>
                                <p className={cx('align-center')}>
                                    Đã có tài khoản?
                                    <button onClick={switchLogin} id={cx('switch-btn')}>
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

import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import Modal from '~/components/Modals';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync, resetAuth } from '~/features/userSlice';
import ErrorMessage from '~/components/ErrorMessage';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Register = ({ open, setLoginOpen, setRegisterOpen }) => {
    const switchLogin = (e) => {
        e.preventDefault();
        setRegisterOpen(false);
        setLoginOpen(true);
    };

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);
    console.log(error);
    const [errorMessages, setErrorMessages] = useState(null);

    // useEffect(() => {
    //     // Reset error message when unmount
    //     return () => {
    //         dispatch(resetAuth());
    //     };
    // }, [dispatch]);

    useEffect(() => {
        if (error) {
            setErrorMessages(error);
        }
    }, [error]);

    // console.log(errorMessages);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const convertDateFormat = (dateString) => {
        const dateArray = dateString.split('-');
        return [dateArray[2], dateArray[1], dateArray[0]].join('-');
    };

    const handleRegister = (data) => {
        if (data.isAgreed) {
            // try {
            dispatch(
                registerAsync({
                    email: data.email,
                    fullname: data.fullname,
                    dob: convertDateFormat(data.dob),
                    gender: data.gender,
                    phoneNumber: data.phoneNumber,
                    username: data.username,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    isCoach: data.isCoach ? true : false,
                }),
            );
            // } catch (error) {
            //     console.log(error);
            // }
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
                            <input
                                type="text"
                                placeholder="Nhập Họ và Tên"
                                {...register('fullname', { required: true })}
                            />
                            {errors?.fullname?.type === 'required' && (
                                <ErrorMessage message="Họ và tên không được để trống !" />
                            )}
                            <div className={cx('col2')}>
                                <label>Giới tính</label>
                                <select name="gender" id="gender" {...register('gender', { required: true })}>
                                    <option value="">--Chọn giới tính--</option>
                                    <option value="Male">Nam</option>
                                    <option value="Female">Nữ</option>
                                    <option value="Other">Khác</option>
                                </select>
                                {errors?.gender?.type === 'required' && (
                                    <ErrorMessage message="Giới tính phải được chọn !" />
                                )}
                            </div>

                            <div className={cx('col2', 'f-right')}>
                                <label>Ngày sinh</label>
                                <input type="date" id="dob" name="dob" {...register('dob', { required: true })} />
                                {errors?.dob?.type === 'required' && (
                                    <ErrorMessage message="Ngày sinh không được để trống !" />
                                )}
                            </div>

                            <label>Số điện thoại</label>
                            <input
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                name="phoneNumber"
                                {...register('phoneNumber', { required: true })}
                            />
                            {errors?.phoneNumber?.type === 'required' && (
                                <ErrorMessage message="Số điện thoại không được để trống !" />
                            )}
                            <label>Địa chỉ email</label>
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                name="email"
                                {...register('email', { required: true })}
                            />
                            {errors?.email?.type === 'required' && (
                                <ErrorMessage message="Email không được để trống !" />
                            )}
                            <label>Tài khoản</label>
                            <input
                                type="text"
                                placeholder="Nhập tài khoản"
                                {...register('username', { required: true })}
                            />
                            {errors?.username?.type === 'required' && (
                                <ErrorMessage message="Tài khoản không được để trống !" />
                            )}

                            <div className={cx('col-2')}>
                                <label>Mật khẩu</label>
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    {...register('password', { required: true })}
                                />
                                {errors?.password?.type === 'required' && (
                                    <ErrorMessage message="Mật khẩu không được để trống !" />
                                )}
                            </div>
                            <div className={cx('col2', 'f-right')}>
                                <label>Xác nhận mật khẩu</label>
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    name="c"
                                    {...register('confirmPassword', { required: true })}
                                />
                                {errors?.confirmPassword?.type === 'required' && (
                                    <ErrorMessage message="Xác nhận mật khẩu không được để trống !" />
                                )}
                            </div>

                            <div>
                                <input className={cx('checkbox')} type="checkbox" {...register('isCoach')} /> Đăng ký
                                trở thành huấn luyện viên <br />
                                <input
                                    className={cx('checkbox')}
                                    type="checkbox"
                                    {...register('isAgreed', { required: true })}
                                />{' '}
                                Tôi đồng ý với các điều khoản
                                {errors?.isAgreed?.type === 'required' && (
                                    <ErrorMessage message="Bạn phải đồng ý với các điều khoản !" />
                                )}
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

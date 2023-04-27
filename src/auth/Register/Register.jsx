import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Modal from '~/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync, resetAuth } from '~/features/userSlice';
import ErrorMessage from '~/components/ErrorMessage';
import SuccessMessage from '~/components/SuccessMessage';
import { convertDateFormat } from '~/utils/dateFormat';
import { Link } from 'react-router-dom';

import Spinner from '~/components/Spinner';
import { useState } from 'react';

const cx = classNames.bind(styles);

const schema = yup.object({
    fullname: yup.string().required('Họ và tên không được để trống'),
    gender: yup.string().required('Giới tính phải được chọn'),
    dob: yup
        .date()
        .transform((value, originalValue) => {
            if (originalValue === '') return null;
            return value;
        })
        .max(new Date(), 'Ngày sinh không được chọn trong tương lai')
        .required('Ngày sinh không được để trống')
        .test('age', 'Chưa đủ 16 tuổi', function (value) {
            const today = new Date();
            const birthDate = new Date(value);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= 16;
        }),
    phoneNumber: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ'),
    email: yup.string().required('Email không được để trống'),
    username: yup.string().required('Tài khoản không được để trống'),
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>\\|[\]\/?])([A-Za-z\d!@#$%^&*()\-_=+{};:,<.>\\|[\]\/?]{6,})$/,
            'Mật khẩu phải có ít nhất 1 chữ cái in hoa, 1 chữ cái in thường, 1 số, 1 kí tự đặc biệt và độ dài ít nhất là 6 kí tự',
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không đúng')
        .required('Mật khẩu xác nhận không được để trống'),
    isAgreed: yup
        .boolean()
        .test('is-true', 'Bạn phải đồng ý với các điều khoản', (value) => value === true)
        .required(),
});

const Register = ({ open, setLoginOpen, setRegisterOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm({ resolver: yupResolver(schema) });

    const dispatch = useDispatch();
    const [formattedFullname, setFormattedFullname] = useState('');

    const handleFullnameInput = (event) => {
        const fullname = event.target.value;
        const formattedFullname = fullname
            .toLowerCase()
            .split(' ')
            .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
            .join(' ');

        setFormattedFullname(formattedFullname);
    };

    const switchLogin = (e) => {
        e.preventDefault();
        setRegisterOpen(false);
        reset({
            fullname: '',
            gender: '',
            dob: '',
            email: '',
            phoneNumber: '',
            username: '',
            password: '',
            confirmPassword: '',
            isAgreed: false,
            isCoach: false,
        });
        dispatch(resetAuth());
        clearErrors();
        setLoginOpen(true);
    };

    const { error, message, loading } = useSelector((state) => state.user);

    const handleRegister = (data) => {
        if (data.isAgreed) {
            try {
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
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            {open && (
                <Modal
                    show={open}
                    onClose={() => {
                        setRegisterOpen(false);
                        reset({
                            fullname: '',
                            gender: '',
                            dob: '',
                            email: '',
                            phoneNumber: '',
                            username: '',
                            password: '',
                            confirmPassword: '',
                            isAgreed: false,
                            isCoach: false,
                        });
                        clearErrors();
                    }}
                >
                    <div className={cx('content')}>
                        <div className={cx('img-wrapper')}>
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
                                    {...register('fullname')}
                                    onInput={handleFullnameInput}
                                    value={formattedFullname}
                                />
                                {errors.fullname && <ErrorMessage message={errors.fullname.message} />}
                                <div className={cx('col2')}>
                                    <label>Giới tính</label>
                                    <select name="gender" id="gender" {...register('gender')}>
                                        <option value="">--Chọn giới tính--</option>
                                        <option value="Male">Nam</option>
                                        <option value="Female">Nữ</option>
                                        <option value="Other">Khác</option>
                                    </select>
                                    {errors.gender && <ErrorMessage message={errors.gender.message} />}
                                </div>
                                <div className={cx('col2', 'f-right')}>
                                    <label>Ngày sinh</label>
                                    <input type="date" id="dob" name="dob" {...register('dob')} />
                                    {errors.dob && <ErrorMessage message={errors.dob.message} />}
                                </div>
                                <label>Địa chỉ email</label>
                                <input
                                    type="email"
                                    placeholder="Nhập địa chỉ email"
                                    name="email"
                                    {...register('email')}
                                />
                                {errors.email && <ErrorMessage message={errors.email.message} />}
                                {error?.Email && <ErrorMessage message={error.Email?.message} />}
                                <div className={cx('col2')}>
                                    <label>Tài khoản</label>
                                    <input type="text" placeholder="Nhập tài khoản" {...register('username')} />
                                    {errors.username && <ErrorMessage message={errors.username.message} />}
                                    {error?.Username && <ErrorMessage message={error.Username?.message} />}
                                </div>
                                <div className={cx('col2', 'f-right')}>
                                    <label>Số điện thoại</label>
                                    <input
                                        type="tel"
                                        placeholder="Nhập số điện thoại"
                                        name="phoneNumber"
                                        {...register('phoneNumber')}
                                    />
                                    {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
                                    {error?.Phone && <ErrorMessage message={error.Phone?.message} />}
                                </div>

                                <div className={cx('col2')}>
                                    <label>Mật khẩu</label>
                                    <input type="password" placeholder="Nhập mật khẩu" {...register('password')} />
                                    {errors.password && <ErrorMessage message={errors.password.message} />}
                                </div>
                                <div className={cx('col2', 'f-right')}>
                                    <label>Xác nhận mật khẩu</label>
                                    <input
                                        type="password"
                                        placeholder="Xác nhận mật khẩu"
                                        name="confirmPassword"
                                        {...register('confirmPassword')}
                                    />
                                    {errors.confirmPassword && (
                                        <ErrorMessage message={errors.confirmPassword.message} />
                                    )}
                                </div>
                                <div>
                                    <input className={cx('checkbox')} type="checkbox" {...register('isCoach')} /> Đăng
                                    ký trở thành huấn luyện viên <br />
                                    <input className={cx('checkbox')} type="checkbox" {...register('isAgreed')} /> Tôi
                                    đồng ý với các{' '}
                                    <Link
                                        className={cx('policy-link')}
                                        onClick={() => setRegisterOpen(false)}
                                        to="/policy"
                                    >
                                        điều khoản
                                    </Link>
                                    {errors.isAgreed && <ErrorMessage message={errors.isAgreed.message} />}
                                </div>
                                {message && <SuccessMessage message={message} />}
                                <div>
                                    <button
                                        type="submit"
                                        id={cx('submit-btn')}
                                        className={cx('align-center')}
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner /> : 'Đăng ký'}
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
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Register;

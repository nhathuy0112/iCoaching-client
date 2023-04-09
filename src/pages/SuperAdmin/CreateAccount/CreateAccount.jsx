import styles from './CreateAccount.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin } from '~/features/superAdminSlice';
import { useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '~/components/ErrorMessage';
import SuccessMessage from '~/components/SuccessMessage';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const schema = yup.object({
    fullname: yup.string().required('Họ và tên không được để trống'),
    email: yup.string().required('Email không được để trống'),
    phoneNumber: yup
        .string()
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được để trống'),
    username: yup.string().required('Tài khoản không được để trống'),
    password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>\\|[\]\/?])([A-Za-z\d!@#$%^&*()\-_=+{};:,<.>\\|[\]\/?]{6,})$/,
            'Mật khẩu phải có ít nhất 1 chữ cái in hoa, 1 chữ cái in thường, 1 số, 1 kí tự đặc biệt và độ dài ít nhất là 6 kí tự',
        )
        .required('Mật khẩu không được để trống'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không đúng')
        .required('Mật khẩu xác nhận không được để trống'),
});

const CreateAccount = () => {
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector((state) => state.superAdmin);
    const [response, setResponse] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/super_admin/${currentUser.Id}/create-account`);
            }
        }
    }, [id, currentUser, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const handleCreate = (data) => {
        try {
            dispatch(
                createAdmin({
                    fullname: data.fullname,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    username: data.username,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    note: data.note,
                }),
            )
                .unwrap()
                .then(() => setResponse(true))
                .then(reset);
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setResponse(false);
        }, 3000);
    };

    return (
        <div className={cx('wrapper')}>
            <form id={cx('register-form')} onSubmit={handleSubmit(handleCreate)}>
                <label>Họ và Tên</label>
                <input type="text" placeholder="Nhập Họ và Tên" {...register('fullname')} />
                {errors.fullname && <ErrorMessage message={errors.fullname.message} />}

                <label>Địa chỉ email</label>
                <input type="email" placeholder="Nhập địa chỉ email" {...register('email')} />
                {errors.email && <ErrorMessage message={errors.email.message} />}
                {error?.Email && <ErrorMessage message={error.Email?.message} />}

                <label>Số điện thoại</label>
                <input type="tel" placeholder="Nhập số điện thoại" {...register('phoneNumber')} />
                {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
                {error?.PhoneNumber && <ErrorMessage message={error.PhoneNumber?.message} />}

                <label>Tên người dùng</label>
                <input type="text" placeholder="Nhập tên người dùng" {...register('username')} />
                {errors.username && <ErrorMessage message={errors.username.message} />}
                {error?.Username && <ErrorMessage message={error.Username.message} />}

                <div className={cx('pwd')}>
                    <div className={cx('col2')}>
                        <label>Mật khẩu</label>
                        <input type="password" placeholder="Nhập mật khẩu" {...register('password')} />
                    </div>

                    <div className={cx('col2')}>
                        <label>Xác nhận mật khẩu</label>
                        <input type="password" placeholder="Xác nhận mật khẩu" {...register('confirmPassword')} />
                    </div>
                </div>
                {errors.password && <ErrorMessage message={errors.password.message} />}
                {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
                <label>Ghi chú</label>
                <textarea className={cx('note')} name="" id="" cols="50" rows="3" {...register('note')}></textarea>
                {response && message && <SuccessMessage message={message} />}

                <div>
                    <button type="submit" id={cx('submit-btn')} className={cx('align-center')} disabled={loading}>
                        {loading ? <Spinner /> : 'Thêm mới'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAccount;

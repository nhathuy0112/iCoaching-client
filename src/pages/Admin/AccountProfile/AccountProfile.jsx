import styles from './AccountProfile.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '~/layouts/components/Spinner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { dataURItoBlob } from '~/utils/blob';
import ErrorMessage from '~/components/ErrorMessage';
import SuccessMessage from '~/components/SuccessMessage';

import {
    getUserAvatarAsync,
    getUserProfileAsync,
    updateUserAvatarAsync,
    updateUserProfileAsync,
} from '~/features/userSlice';

import Modal from '~/components/Modal/Modal';
import { BsCheckLg } from 'react-icons/bs';
import { HiOutlineXMark } from 'react-icons/hi2';
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
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được để trống'),
    email: yup.string().required('Email không được để trống'),
});

const AccountProfile = () => {
    const dispatch = useDispatch();
    const { avatar, profile, error, message } = useSelector((state) => state.user);

    const [currentAvatar, setAvatar] = useState(avatar);
    const [loading, setLoading] = useState(true);
    const [confirmAvatar, setConfirmAvatar] = useState(false);
    const [confirmProfile, setConfirmProfile] = useState(false);

    useEffect(() => {
        dispatch(getUserAvatarAsync());
        dispatch(getUserProfileAsync());
        setLoading(false);
        if (!currentAvatar) {
            setAvatar(avatar);
        }
    }, [dispatch, avatar]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const convertDateFormat = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const handleProfile = (data) => {
        try {
            dispatch(
                updateUserProfileAsync({
                    fullname: data.fullname,
                    email: data.email,
                    dob: convertDateFormat(data.dob),
                    gender: data.gender,
                    phoneNumber: data.phoneNumber,
                }),
            );
            reset(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeAvatar = () => {
        onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        };
    };

    const handleSubmitAvatar = () => {
        const formData = new FormData();
        const blob = dataURItoBlob(currentAvatar);
        formData.append('file', blob);
        setLoading(true);
        dispatch(updateUserAvatarAsync(formData)).then(() => {
            setLoading(false);
        });
        setConfirmAvatar(false);
    };

    const handleClose = (e) => {
        setConfirmAvatar(false);
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('text_wrapper')}>Thông tin tài khoản</h2>

            <div className={cx('container')}>
                <div className={cx('left_container')}>
                    <label>Ảnh đại diện</label>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <div className={cx('avatar')}>
                                <img src={currentAvatar} alt="" style={{ width: '100%', height: '100%' }} />
                                <input id="upload" type="file" accept="image/*" hidden />
                                <label className={cx('change_image')} htmlFor="upload" onClick={handleChangeAvatar}>
                                    Change Image
                                </label>
                            </div>
                        </>
                    )}
                    <button type="submit" onClick={() => setConfirmAvatar(true)}>
                        Cập nhật ảnh đại diện
                    </button>
                </div>

                <div className={cx('right_container')}>
                    <form id={cx('update_form')} onSubmit={handleSubmit(handleProfile)}>
                        <label>Họ và Tên</label>
                        <input
                            type="text"
                            placeholder="Nhập Họ và Tên"
                            value={profile.fullname}
                            {...register('fullname')}
                        />
                        {errors.fullname && <ErrorMessage message={errors.fullname.message} />}
                        <div className={cx('column')}>
                            <div className={cx('col-2')}>
                                <label>Giới tính</label>
                                <select
                                    defaultValue={profile.gender ? profile.gender : ''}
                                    {...register('gender', { required: true })}
                                >
                                    <option value="" disabled>
                                        ----Chọn giới tính----
                                    </option>
                                    <option value="Male">Nam</option>
                                    <option value="Female">Nữ</option>
                                    <option value="Other">Khác</option>
                                </select>
                                {errors.gender && <ErrorMessage message={errors.gender.message} />}
                            </div>
                            <div className={cx('col-2')}>
                                <label>Ngày sinh</label>
                                <input type="date" value={profile.dob} {...register('dob')} />
                                {errors.dob && <ErrorMessage message={errors.dob.message} />}
                            </div>
                        </div>
                        <label>Địa chỉ email</label>
                        <input
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            value={profile.email}
                            {...register('email')}
                        />{' '}
                        {errors.email && <ErrorMessage message={errors.email.message} />}
                        {error?.Email && <ErrorMessage message={error.Email?.message} />}
                        <label>Số điện thoại</label>
                        <input
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            value={profile.phoneNumber}
                            {...register('phoneNumber')}
                        />
                        {errors.phoneNumber && <ErrorMessage message={errors.phoneNumber.message} />}
                        {error?.Phone && <ErrorMessage message={error.Phone?.message} />}
                        <button
                            type="submit"
                            id={cx('submit_btn')}
                            className={cx('align-center')}
                            onClick={() => setConfirmProfile(true)}
                        >
                            Cập nhật thông tin cá nhân
                        </button>
                        <div className={cx('modal_container')}>
                            {confirmProfile && (
                                <Modal
                                    show={confirmAvatar}
                                    onClose={handleClose}
                                    modalStyle={{ width: '60%' }}
                                    closeBtnStyle={{ display: 'none' }}
                                >
                                    <h1 className={cx('modal_header')}>iCoaching</h1>
                                    <h2 className={cx('text_modal')}>Bạn có đồng ý cập nhật thông tin cá nhân ? </h2>
                                    <div className={cx('container_confirm')}>
                                        <button className={cx('button_active')}>
                                            <BsCheckLg className={cx('icon_modal')} />
                                            Đồng ý
                                        </button>
                                        <button className={cx('button_lock')} onClick={handleClose}>
                                            <HiOutlineXMark className={cx('icon_modal')} />
                                            Huỷ bỏ
                                        </button>
                                    </div>
                                </Modal>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <div className={cx('modal_container')}>
                {confirmAvatar && (
                    <Modal
                        show={confirmAvatar}
                        onClose={handleClose}
                        modalStyle={{ width: '60%' }}
                        closeBtnStyle={{ display: 'none' }}
                    >
                        <h1 className={cx('modal_header')}>iCoaching</h1>
                        <h2 className={cx('text_modal')}>Bạn có đồng ý cập nhật ảnh đại diện?</h2>
                        <div className={cx('container_confirm')}>
                            <button className={cx('button_active')} onClick={handleSubmitAvatar}>
                                <BsCheckLg className={cx('icon_modal')} />
                                Đồng ý
                            </button>
                            <button className={cx('button_lock')} onClick={handleClose}>
                                <HiOutlineXMark className={cx('icon_modal')} />
                                Huỷ bỏ
                            </button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default AccountProfile;

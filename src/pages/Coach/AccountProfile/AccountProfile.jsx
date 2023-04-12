import styles from './AccountProfile.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '~/components/Spinner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { dataURItoBlob } from '~/utils/blob';
import ErrorMessage from '~/components/ErrorMessage';

import {
    getUserAvatarAsync,
    getUserProfileAsync,
    updateUserAvatarAsync,
    updateUserProfileAsync,
} from '~/features/userSlice';

import Modal from '~/components/Modal/Modal';
import { BsCheckLg } from 'react-icons/bs';
import { HiXMark } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDateFormat, convertDateFormatToInput } from '~/utils/dateFormat';
import { toast } from 'react-toastify';
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
    const { avatar, error, loading } = useSelector((state) => state.user);
    const [currentAvatar, setCurrentAvatar] = useState(avatar);
    const [avatarLoading, setLoading] = useState(true);
    const [confirmAvatar, setConfirmAvatar] = useState(false);

    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/coach/${currentUser.Id}/account-information`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getUserAvatarAsync());
        setCurrentAvatar(avatar);
        setLoading(false);
    }, [dispatch, avatar]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        dispatch(getUserProfileAsync())
            .unwrap()
            .then((response) => {
                setValue('fullname', response.fullname);
                setValue('dob', convertDateFormatToInput(response.dob));
                setValue('gender', response.gender);
                setValue('email', response.email);
                setValue('phoneNumber', response.phoneNumber);
            });
    }, [dispatch, setValue]);

    const handleProfile = (data) => {
        try {
            dispatch(
                updateUserProfileAsync({
                    fullname: data.fullname,
                    gender: data.gender,
                    dob: convertDateFormat(data.dob),
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                }),
            )
                .unwrap()
                .then(() => {
                    dispatch(getUserProfileAsync());
                    toast.success('Cập nhật thông tin thành công!');
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeAvatar = () => {
        onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setCurrentAvatar(reader.result);
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
            <div className={cx('container')}>
                <div className={cx('left_container')}>
                    <h3>Ảnh đại diện</h3>
                    {avatarLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <div className={cx('avatar')}>
                                <img src={currentAvatar} alt="" style={{ width: '100%', height: '100%' }} />
                                <input id="upload" type="file" accept="image/*" hidden />
                                <label className={cx('change_image')} htmlFor="upload" onClick={handleChangeAvatar}>
                                    Chọn ảnh
                                </label>
                            </div>
                            <button type="submit" onClick={() => setConfirmAvatar(true)}>
                                Thay đổi
                            </button>
                        </>
                    )}
                </div>

                <div className={cx('right_container')}>
                    <form id={cx('update_form')} onSubmit={handleSubmit(handleProfile)}>
                        <div className={cx('input-group')}>
                            <label>Họ và Tên</label>
                            <input type="text" placeholder="Nhập Họ và Tên" {...register('fullname')} />
                            {errors.fullname && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={errors.fullname.message} />
                                </div>
                            )}
                        </div>
                        <div className={cx('column')}>
                            <div className={cx('col-2')}>
                                <div className={cx('input-group', 'gender')}>
                                    <label>Giới tính</label>
                                    <select {...register('gender', { required: true })}>
                                        <option value="" disabled>
                                            ----Chọn giới tính----
                                        </option>
                                        <option value="Male">Nam</option>
                                        <option value="Female">Nữ</option>
                                        <option value="Other">Khác</option>
                                    </select>
                                    {errors.gender && (
                                        <div className={cx('error')}>
                                            <ErrorMessage message={errors.gender.message} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={cx('col-2')}>
                                <div className={cx('input-group', 'dob')}>
                                    <label>Ngày sinh</label>
                                    <input type="date" {...register('dob')} />
                                    {errors.dob && (
                                        <div className={cx('error')}>
                                            <ErrorMessage message={errors.dob.message} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx('input-group')}>
                            <label>Địa chỉ email</label>
                            <input type="email" placeholder="Nhập địa chỉ email" {...register('email')} />{' '}
                            {errors.email && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={errors.email.message} />
                                </div>
                            )}
                            {error?.Email && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={error.Email?.message} />
                                </div>
                            )}
                        </div>
                        <div className={cx('input-group')}>
                            <label>Số điện thoại</label>
                            <input type="text" placeholder="Nhập số điện thoại" {...register('phoneNumber')} />
                            {errors.phoneNumber && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={errors.phoneNumber.message} />
                                </div>
                            )}
                            {error?.Phone && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={error.Phone?.message} />
                                </div>
                            )}
                        </div>
                        <button type="submit" id={cx('submit_btn')} className={cx('align-center')} disabled={loading}>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <>
                                    <BsCheckLg className={cx('icon')} />
                                    Cập nhật
                                </>
                            )}
                        </button>
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
                                <BsCheckLg className={cx('icon')} />
                                Đồng ý
                            </button>
                            <button className={cx('button_lock')} onClick={handleClose}>
                                <HiXMark className={cx('icon')} />
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

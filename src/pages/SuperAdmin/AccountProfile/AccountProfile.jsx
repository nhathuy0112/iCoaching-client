import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAvatar, updateCurrentUserAvatar, updateUser } from '~/features/superAdminSlice';
import Spinner from '~/layouts/components/Spinner';
import styles from './AccountProfile.module.scss';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import Modal from '~/components/Modal/Modal';
import { BsCheckLg } from 'react-icons/bs';
import { HiOutlineXMark } from 'react-icons/hi2';
const cx = classNames.bind(styles);

const AccountProfile = () => {
    const dispatch = useDispatch();
    const userAvatar = useSelector((state) => state.superadmin.avatar);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [imageProfile, setImageProfile] = useState(userAvatar);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm();
    const [updateImage, setUpdateImage] = useState();
    const [changeProfile, setChangeProfile] = useState(false);
    const [changeAva, setChangeAva] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        dispatch(getCurrentUserAvatar());
        setImageProfile(userAvatar);
        setLoading(false);
    }, [dispatch, userAvatar]);

    const convertDateFormat = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const handleButtonClick = () => {
        onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageProfile(reader.result);
                setUpdateImage(file);
            };
            reader.readAsDataURL(file);
        };
    };

    const handleUpload = () => {
        if (updateImage) {
            setLoading(true);
            dispatch(updateCurrentUserAvatar(updateImage)).then(() => {
                setLoading(false);
            });
            setChangeAva(false);
        }
    };

    const onSubmit = (data) => {
        setFormData({
            email: data.email,
            fullname: data.fullname,
            dob: convertDateFormat(data.dob),
            gender: data.gender,
            phoneNumber: data.phoneNumber,
        });
    };
    const handleUpdate = async () => {
        const result = await dispatch(updateUser(formData));
        if (result.payload) {
            reset();
            setChangeProfile(false);
        }
        setChangeProfile(false);
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
                            <img src={imageProfile} alt="" style={{ width: '100%', height: '100%' }} />
                            <input id="upload" type="file" accept="image/*" hidden />
                            <label className={cx('change_image')} htmlFor="upload" onClick={handleButtonClick}>
                                Change Image
                            </label>
                        </>
                    )}
                    <button type="submit" onClick={() => setChangeAva(true)}>
                        Cập nhật ảnh đại diện
                    </button>
                    <div className={cx('modal_container')}>
                        {changeAva && (
                            <Modal
                                show={changeAva}
                                onClose={() => setChangeAva(false)}
                                modalStyle={{ width: '60%' }}
                                closeBtnStyle={{ display: 'none' }}
                            >
                                <h1 className={cx('modal_header')}>iCoaching</h1>
                                <h2 className={cx('text_modal')}>Bạn có đồng ý cập nhật ảnh đại diện ? </h2>
                                <div className={cx('container_confirm')}>
                                    <button className={cx('button_active')} onClick={handleUpload}>
                                        <BsCheckLg className={cx('icon_modal')} />
                                        Đồng ý
                                    </button>
                                    <button className={cx('button_lock')} onClick={() => setChangeAva(false)}>
                                        <HiOutlineXMark className={cx('icon_modal')} />
                                        Huỷ bỏ
                                    </button>
                                </div>
                            </Modal>
                        )}
                    </div>
                    <div>{currentUser?.email}</div>
                </div>

                <div className={cx('right_container')}>
                    <form id={cx('update_form')} onSubmit={handleSubmit(onSubmit)}>
                        <label>Họ và Tên</label>
                        <input type="text" placeholder="Nhập Họ và Tên" {...register('fullname')} />
                        <div className={cx('column')}>
                            <div className={cx('col-2')}>
                                <label>Giới tính</label>
                                <select defaultValue="" {...register('gender', { required: true })}>
                                    <option value="" disabled>
                                        Chọn giới tính
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className={cx('col-2')}>
                                <label>Ngày sinh</label>
                                <input type="date" {...register('dob')} />
                            </div>
                        </div>
                        <label>Địa chỉ email</label>
                        <input type="email" placeholder="Nhập địa chỉ email" {...register('email')} />
                        <label>Số điện thoại</label>
                        <input type="tel" placeholder="Nhập số điện thoại" {...register('phoneNumber')} />

                        <button
                            type="submit"
                            id={cx('submit_btn')}
                            className={cx('align-center')}
                            onClick={() => setChangeProfile(true)}
                        >
                            Cập nhật thông tin cá nhân
                        </button>
                        <div className={cx('modal_container')}>
                            {changeProfile && (
                                <Modal
                                    show={changeProfile}
                                    onClose={() => setChangeProfile(false)}
                                    modalStyle={{ width: '60%' }}
                                    closeBtnStyle={{ display: 'none' }}
                                >
                                    <h1 className={cx('modal_header')}>iCoaching</h1>
                                    <h2 className={cx('text_modal')}>Bạn có đồng ý cập nhật thông tin cá nhân ? </h2>
                                    <div className={cx('container_confirm')}>
                                        <button className={cx('button_active')} onClick={handleUpdate}>
                                            <BsCheckLg className={cx('icon_modal')} />
                                            Đồng ý
                                        </button>
                                        <button className={cx('button_lock')} onClick={() => setChangeProfile(false)}>
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
        </div>
    );
};

export default AccountProfile;

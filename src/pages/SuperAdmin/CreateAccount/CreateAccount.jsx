import styles from './CreateAccount.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createAdmin } from '~/features/superAdminSlice';
import { useState } from 'react';
import Modal from '~/components/Modal/Modal';
import { BsCheckLg } from 'react-icons/bs';
import { HiOutlineXMark } from 'react-icons/hi2';

const cx = classNames.bind(styles);

const CreateAccount = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [formData, setFormData] = useState(null);

    const onSubmit = (data) => {
        setFormData({
            email: data.email,
            fullname: data.fullname,
            username: data.username,
            password: data.password,
            confirmPassword: data.confirmPassword,
        });
    };

    const handleRegister = async () => {
        const result = await dispatch(createAdmin(formData));
        if (result.payload) {
            reset();
            setOpen(false);
        }
        setOpen(false);
    };

    return (
        <div className={cx('wrapper')}>
            <form id={cx('register-form')} onSubmit={handleSubmit(onSubmit)}>
                <label>Họ và Tên</label>
                <input type="text" placeholder="Nhập Họ và Tên" {...register('fullname')} />
                <label>Địa chỉ email</label>
                <input type="email" placeholder="Nhập địa chỉ email" {...register('email')} />
                <label>Tên người dùng</label>
                <input type="text" placeholder="Nhập số điện thoại" {...register('username')} />
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
                <div>
                    <button
                        type="submit"
                        id={cx('submit-btn')}
                        className={cx('align-center')}
                        onClick={() => setOpen(true)}
                    >
                        Thêm mới
                    </button>
                </div>
                <div className={cx('modal_container')}>
                    {open && (
                        <Modal
                            show={open}
                            onClose={() => setOpen(false)}
                            modalStyle={{ width: '60%' }}
                            closeBtnStyle={{ display: 'none' }}
                        >
                            <h1 className={cx('modal_header')}>iCoaching</h1>
                            <h2 className={cx('text_modal')}>Bạn có đồng ý thêm mới admin ? </h2>
                            <div className={cx('container_confirm')}>
                                <button className={cx('button_active')} onClick={handleRegister}>
                                    <BsCheckLg className={cx('icon_modal')} />
                                    Đồng ý
                                </button>
                                <button className={cx('button_lock')} onClick={() => setOpen(false)}>
                                    <HiOutlineXMark className={cx('icon_modal')} />
                                    Huỷ bỏ
                                </button>
                            </div>
                        </Modal>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateAccount;

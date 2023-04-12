import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Voucher.module.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCheckLg, BsXLg } from 'react-icons/bs';

import { createVoucherAsync, updateContractStatusAsync, updateReportAsync } from '~/features/adminSlice';
import Modal from '~/components/Modal';
import Spinner from '~/components/Spinner';
import { getContractDetailsAsync } from '~/features/contractSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorMessage from '~/components/ErrorMessage';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const schema = yup.object({
    voucher: yup
        .string()
        .required('Phần trăm giảm giá không được để trống')
        .test('greaterThanZero', 'Phần trăm giảm giá phải lớn hơn 0', (value) => {
            if (value && parseInt(value) <= 0) {
                return false;
            }
            return true;
        })
        .test('durationFormat', 'Phần trăm giảm giá phải là số và không gồm kí tự đặc biệt', (value) => {
            if (value && !/^\d+$/.test(value)) {
                return false;
            }
            return true;
        }),
    note: yup.string().required('Mô tả không được để trống'),
});

const Voucher = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const { currentContract, loading } = useSelector((state) => state.contract);
    const { contractId, reportId } = useParams();
    const { client } = currentContract;
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [cancelOpen, setCancelOpen] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        dispatch(getContractDetailsAsync(contractId));
    }, [dispatch, contractId]);

    const handleCreateVoucher = (data) => {
        dispatch(createVoucherAsync({ reportId: reportId, discount: data.voucher, data: data.note }))
            .unwrap()
            .then(() => {
                toast.success('Tạo mã giảm giá thành công');
                dispatch(
                    updateReportAsync({
                        reportId: reportId,
                        option: 'Solve',
                        message: 'Đã tặng voucher cho khách hàng',
                    }),
                );

                toast.success('Đã cập nhật trạng thái khiếu nại');
            });
        setCancelOpen(true);
    };

    //update contract status
    const handleCancelContract = (e) => {
        e.preventDefault();
        if (!message) {
            setMessageError('Lý do không được để trống');
        } else {
            dispatch(updateContractStatusAsync({ reportId: reportId, option: 'Cancel', message: message }))
                .unwrap()
                .then(() => {
                    navigate(`/admin/${currentUser.id}/reports`);
                    toast.success('Đã cập nhật trạng thái hợp đồng');
                });
            setCancelLoading(true);
        }
    };

    const handleCloseCancel = (e) => {
        e.preventDefault();
        setCancelOpen(false);
        navigate(`/admin/${currentUser.id}/reports`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <Link
                        to={`/admin/${currentUser?.Id}/reports/${contractId}/view-details/${reportId}`}
                        className={cx('back-link')}
                    >
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <h1 className={cx('title')}>Voucher</h1>
                <form className={cx('voucher')} onSubmit={handleSubmit(handleCreateVoucher)}>
                    <div className={cx('row')}>
                        <label>Khách hàng</label>
                        <span>{client?.fullname}</span>
                    </div>
                    <div className={cx('row')}>
                        <label>{`Giảm giá (%)`}</label>
                        <input type="text" id="" {...register('voucher')} />
                    </div>
                    {errors.voucher && (
                        <div className={cx('error')}>
                            <ErrorMessage message={errors.voucher.message} />
                        </div>
                    )}
                    <div className={cx('row', 'note')}>
                        <label>Ghi chú</label>
                        <textarea {...register('note')} id="" cols="30" rows="10"></textarea>
                    </div>
                    {errors.note && (
                        <div className={cx('error')}>
                            <ErrorMessage message={errors.note.message} />
                        </div>
                    )}
                    <button type="submit" className={cx('send-btn')} disabled={loading}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                <AiOutlineCheck className={cx('icon')} />
                                <span>Gửi</span>
                            </>
                        )}
                    </button>
                </form>
                {/* cancel contract modal */}
                {cancelOpen && (
                    <Modal
                        open={cancelOpen}
                        onClose={() => setCancelOpen(false)}
                        closeBtnStyle={{ display: 'none' }}
                        modalStyle={{ width: '60%' }}
                    >
                        <div className={cx('modal')}>
                            <h2 className={cx('header')}>iCoaching</h2>
                            <h2 className={cx('title')}>Bạn có muốn huỷ hợp đồng này? Hãy nhập lý do: </h2>
                            <div className={cx('message-frame')}>
                                <textarea
                                    name="cancel"
                                    id=""
                                    cols="30"
                                    rows="10"
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                        if (!e.target.value) {
                                            setMessageError('Lý do không được để trống');
                                        } else {
                                            setMessageError('');
                                        }
                                    }}
                                ></textarea>
                            </div>
                            {messageError && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={messageError} />
                                </div>
                            )}
                            <div className={cx('button')}>
                                {cancelLoading ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <button
                                            className={cx('btn-confirm')}
                                            onClick={handleCancelContract}
                                            type="submit"
                                        >
                                            <BsCheckLg className={cx('icon')} />
                                            Xác nhận
                                        </button>
                                        <button className={cx('btn-warn')} onClick={handleCloseCancel}>
                                            <BsXLg className={cx('icon')} /> Từ chối
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Voucher;

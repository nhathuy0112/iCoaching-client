import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Voucher.module.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCheckLg, BsXLg } from 'react-icons/bs';

import { createVoucherAsync, updateContractStatusAsync, updateReportAsync } from '~/features/adminSlice';
import Modal from '~/components/Modal';
import Spinner from '~/layouts/components/Spinner';

const cx = classNames.bind(styles);

const Voucher = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const { currentContract, loading } = useSelector((state) => state.contract);
    const { contractId, reportId } = useParams();
    const { client } = currentContract;

    const [voucher, setVoucher] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [cancelOpen, setCancelOpen] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createVoucherAsync({ reportId: reportId, discount: voucher, data: description }))
            .unwrap()
            .then(() =>
                dispatch(
                    updateReportAsync({
                        reportId: reportId,
                        option: 'Solve',
                        message: 'Đã tặng voucher cho khách hàng',
                    }),
                ),
            );
        setCancelOpen(true);
    };

    //update contract status
    const handleCancelContract = (e) => {
        setCancelLoading(true);
        e.preventDefault();
        dispatch(updateContractStatusAsync({ reportId: reportId, option: 'Cancel', message: message }))
            .unwrap()
            .then(() => navigate(`/admin/${currentUser.id}/reports`));
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
                        to={`/admin/${currentUser?.Id}/reports/${contractId}/${reportId}`}
                        className={cx('back-link')}
                    >
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <form className={cx('voucher')}>
                    <div className={cx('row')}>
                        <label>Khách hàng</label>
                        <span>{client?.fullname}</span>
                    </div>
                    <div className={cx('row')}>
                        <label>{`Giảm giá (%)`}</label>
                        <input type="text" name="discount" id="" onChange={(e) => setVoucher(e.target.value)} />
                    </div>
                    <div className={cx('row')}>
                        <label>Ghi chú</label>
                        <textarea
                            name="description"
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                <AiOutlineCheck className={cx('icon')} />
                                Gửi
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
                            <textarea
                                name="cancel"
                                id=""
                                cols="30"
                                rows="10"
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
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

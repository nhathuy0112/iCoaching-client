import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Voucher.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import { createVoucherAsync } from '~/features/adminSlice';

const cx = classNames.bind(styles);

const Voucher = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { currentContract } = useSelector((state) => state.contract);
    const { contractId, reportId } = useParams();
    const { client } = currentContract;

    const [voucher, setVoucher] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createVoucherAsync({ clientId: currentUser.Id, discount: voucher, data: description }));
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
                    <button onClick={handleSubmit}>
                        <AiOutlineCheck className={cx('icon')} />
                        Gửi
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Voucher;

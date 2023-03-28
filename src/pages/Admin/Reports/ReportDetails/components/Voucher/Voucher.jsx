import classNames from 'classnames/bind';
import React from 'react';
import styles from './Voucher.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';

const cx = classNames.bind(styles);

const Voucher = () => {
    const { currentUser } = useSelector((state) => state.admin);
    const { currentContract } = useSelector((state) => state.contract);
    const { contractId } = useParams();
    const { client } = currentContract;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <Link to={`/admin/${currentUser?.Id}/reports/${contractId}`} className={cx('back-link')}>
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <form action="" className={cx('contract')}>
                    <label>Khách hàng</label>
                    <span>{client.fullname}</span>
                    <label>{`Giảm giá (%)`}</label>
                    <input type="text" name="discount" id="" />
                    <label>Ghi chú</label>
                    <textarea name="description" id="" cols="30" rows="10"></textarea>
                    <button>Gửi</button>
                </form>
            </div>
        </div>
    );
};

export default Voucher;

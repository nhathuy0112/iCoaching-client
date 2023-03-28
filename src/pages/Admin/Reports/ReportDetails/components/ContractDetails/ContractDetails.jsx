import classNames from 'classnames/bind';
import styles from './ContractDetails.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContractDetailsAsync } from '~/features/contractSlice';

const cx = classNames.bind(styles);

const ContractDetails = () => {
    const { currentContract } = useSelector((state) => state.contract);
    const { client, coach, ...contract } = currentContract;
    const dispatch = useDispatch();
    const { contractId } = useParams();

    useEffect(() => {
        dispatch(getContractDetailsAsync(contractId));
    }, [dispatch, contractId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('contract-info')}>
                    <div className={cx('f-col')}>
                        <label>Khách hàng</label>
                        <span>{client?.fullname}</span>
                        <label>Huấn luyện viên</label>
                        <span>{coach?.fullname}</span>
                        <label>Gói tập</label>
                        <span>{contract?.courseName}</span>
                    </div>
                    <div className={cx('col')} id={cx('sm')}>
                        <label>Giới tính</label>
                        <span>{client?.gender}</span>
                        <label>Giới tính</label>
                        <span>{coach?.gender}</span>
                        <label>Số buổi tập</label>
                        <span>{contract?.duration}</span>
                    </div>
                    <div className={cx('col')}>
                        <label>Email</label>
                        <span>{client?.email}</span>
                        <label>Email</label>
                        <span>{coach?.email}</span>
                        <label>Trạng thái</label>
                        <span>Đang tập</span>
                    </div>
                    <div className={cx('col')} id={cx('last')}>
                        <label>SĐT</label>
                        <span>{client?.phoneNumber}</span>
                        <label>SĐT</label>
                        <span>{coach?.phoneNumber}</span>
                        <label>Giá</label>
                        <span>{contract?.price}</span>
                    </div>
                </div>
                <div className={cx('description')}>
                    <label>Mô tả gói tập</label>
                    <p>{contract?.courseDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;

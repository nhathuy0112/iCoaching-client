import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContractDetailsAsync } from '~/features/contractSlice';
import { handleRenderGenders } from '~/utils/gender';
import styles from './Information.module.scss';

const cx = classNames.bind(styles);

const Information = () => {
    const dispatch = useDispatch();
    const { currentContract } = useSelector((state) => state.contract);
    const { contractId } = useParams();

    useEffect(() => {
        dispatch(getContractDetailsAsync(contractId));
    }, [dispatch, contractId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('contract-info')}>
                    <div className={cx('row-info')}>
                        <div className={cx('group-info', 'first-column')}>
                            <label htmlFor="">Khách hàng</label>
                            <span>{currentContract?.client?.fullname}</span>
                        </div>
                        <div className={cx('group-info', 'second-column')}>
                            <label htmlFor="">Giới tính</label>
                            <span>{handleRenderGenders(currentContract?.client?.gender)}</span>
                        </div>
                        <div className={cx('group-info', 'third-column')}>
                            <label htmlFor="">Tuổi</label>
                            <span>{currentContract?.client?.age}</span>
                        </div>
                        <div className={cx('group-info', 'fourth-column')}>
                            <label htmlFor="">Email</label>
                            <span>{currentContract?.client?.email}</span>
                        </div>
                        <div className={cx('group-info', 'fifth-column')}>
                            <label htmlFor="">SĐT</label>
                            <span>{currentContract?.client?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className={cx('row-info')}>
                        <div className={cx('group-info', 'first-column')}>
                            <label htmlFor="">Huấn luyện viên</label>
                            <span>{currentContract?.coach?.fullname}</span>
                        </div>
                        <div className={cx('group-info', 'second-column')}>
                            <label htmlFor="">Giới tính</label>
                            <span>{handleRenderGenders(currentContract?.coach?.gender)}</span>
                        </div>
                        <div className={cx('group-info', 'third-column')}>
                            <label htmlFor="">Tuổi</label>
                            <span>{currentContract?.coach?.age}</span>
                        </div>
                        <div className={cx('group-info', 'fourth-column')}>
                            <label htmlFor="">Email</label>
                            <span>{currentContract?.coach?.email}</span>
                        </div>
                        <div className={cx('group-info', 'fifth-column')}>
                            <label htmlFor="">SĐT</label>
                            <span>{currentContract?.coach?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className={cx('row-info')}>
                        <div className={cx('group-info', 'first-column')}>
                            <label htmlFor="">Gói tập</label>
                            <span>{currentContract?.courseName}</span>
                        </div>
                        <div className={cx('group-info', 'second-column')}>
                            <label htmlFor="">Số buổi</label>
                            <span>{currentContract?.duration}</span>
                        </div>
                        <div className={cx('group-info', 'third-column')}>
                            <label htmlFor="">Trạng thái</label>
                            <span>Đang tập</span>
                        </div>
                        <div className={cx('group-info', 'fourth-column')}>
                            <label htmlFor="">Giá</label>
                            <span>{currentContract?.price}</span>
                        </div>
                    </div>
                    <div className={cx('row-info')}>
                        <div className={cx('group-info', 'description')}>
                            <label htmlFor="">Mô tả</label>
                            <span>{currentContract?.courseDescription}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('completed-btn')}>
                <button>Hoàn thành</button>
            </div>
        </div>
    );
};

export default Information;

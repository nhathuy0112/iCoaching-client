import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContractDetailsAsync } from '~/features/contractSlice';
import Spinner from '~/components/Spinner';
import { handleRenderGenders } from '~/utils/gender';
import styles from './Information.module.scss';

const cx = classNames.bind(styles);

const Information = () => {
    const dispatch = useDispatch();
    const { currentContract, loading } = useSelector((state) => state.contract);

    const { contractId } = useParams();

    useEffect(() => {
        dispatch(getContractDetailsAsync(contractId));
    }, [dispatch, contractId]);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <div className={cx('content')}>
                    <div className={cx('contract-info')}>
                        <div className={cx('info-container', 'created-date')}>
                            <div className={cx('row-info')}>
                                <div className={cx('info-group')}>
                                    <label htmlFor="">Ngày bắt đầu</label>
                                    <span>{currentContract?.createdDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('info-column')}>
                            <div className={cx('info-container')}>
                                <h4 className={cx('title')}>Khách hàng</h4>
                                <div className={cx('info-frame')}>
                                    <div className={cx('row-info')}>
                                        <div className={cx('info-group')}>
                                            <label htmlFor="">Họ và tên</label>
                                            <span>{currentContract?.client?.fullname}</span>
                                        </div>
                                        <div className={cx('info-group')}>
                                            <label htmlFor="">Giới tính</label>
                                            <span>{handleRenderGenders(currentContract?.client?.gender)}</span>
                                        </div>
                                        <div className={cx('info-group')}>
                                            <label htmlFor="">Tuổi</label>
                                            <span>{currentContract?.client?.age}</span>
                                        </div>
                                        <div className={cx('info-group', 'first-column')}>
                                            <label htmlFor="">Số điện thoại</label>
                                            <span>{currentContract?.client?.phoneNumber}</span>
                                        </div>
                                        <div className={cx('info-group', 'second-column')}>
                                            <label htmlFor="">Email</label>
                                            <span>{currentContract?.client?.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info-container')}>
                                <h4 className={cx('title')}>Huấn luyện viên</h4>
                                <div className={cx('info-frame')}>
                                    <div className={cx('row-info')}>
                                        <div className={cx('info-group', 'first-column')}>
                                            <label htmlFor="">Họ và tên</label>
                                            <span>{currentContract?.coach?.fullname}</span>
                                        </div>
                                        <div className={cx('info-group', 'second-column')}>
                                            <label htmlFor="">Giới tính</label>
                                            <span>{handleRenderGenders(currentContract?.coach?.gender)}</span>
                                        </div>
                                        <div className={cx('info-group', 'third-column')}>
                                            <label htmlFor="">Tuổi</label>
                                            <span>{currentContract?.coach?.age}</span>
                                        </div>
                                        <div className={cx('info-group', 'first-column')}>
                                            <label htmlFor="">Số điện thoại</label>
                                            <span>{currentContract?.coach?.phoneNumber}</span>
                                        </div>
                                        <div className={cx('info-group', 'second-column')}>
                                            <label htmlFor="">Email</label>
                                            <span>{currentContract?.coach?.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('info-container')}>
                            <h4 className={cx('title')}>Gói tập</h4>
                            <div className={cx('info-frame')}>
                                <div className={cx('row-info')}>
                                    <div className={cx('info-group', 'first-column')}>
                                        <label htmlFor="">Tên gói tập</label>
                                        <span>{currentContract?.courseName}</span>
                                    </div>
                                    <div className={cx('info-group', 'second-column')}>
                                        <label htmlFor="">Giá</label>
                                        <span>{currentContract?.price}</span>
                                    </div>
                                    <div className={cx('info-group', 'third-column')}>
                                        <label htmlFor="">Số buổi</label>
                                        <span>{currentContract?.duration}</span>
                                    </div>
                                    <div className={cx('info-group', 'first-column')}>
                                        <label htmlFor="">Trạng thái</label>
                                        <span>
                                            {currentContract?.status === 'Canceled' ? 'Đã hủy' : 'Đã hoàn thành'}
                                        </span>
                                    </div>

                                    <div className={cx('info-group', 'first-column', 'description')}>
                                        <label htmlFor="">Mô tả</label>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: currentContract?.courseDescription }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Information;

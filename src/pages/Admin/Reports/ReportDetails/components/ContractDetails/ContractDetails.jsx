import classNames from 'classnames/bind';
import styles from './ContractDetails.module.scss';
import { useSelector } from 'react-redux';
import { handleRenderGenders } from '~/utils/gender';

const cx = classNames.bind(styles);

const ContractDetails = () => {
    const { currentContract } = useSelector((state) => state.contract);

    const handleRenderContractStatus = (status) => {
        switch (status) {
            case 'Active':
                return 'Đang tập luyện';
            case 'Pending':
                return 'Đợi hoàn thành';
            case 'Complete':
                return 'Đã hoàn thành';
            case 'Canceled':
                return 'Đã hủy';
            default:
                return '';
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('contract-info')}>
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
                                </div>
                                <div className={cx('row-info')}>
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
                            </div>
                            <div className={cx('row-info')}>
                                <div className={cx('info-group', 'first-column')}>
                                    <label htmlFor="">Trạng thái</label>
                                    <span>Đang tập luyện</span>
                                </div>
                            </div>
                            <div className={cx('row-info')}>
                                <div className={cx('info-group', 'first-column', 'description')}>
                                    <label htmlFor="">Mô tả</label>
                                    <div dangerouslySetInnerHTML={{ __html: currentContract?.courseDescription }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;

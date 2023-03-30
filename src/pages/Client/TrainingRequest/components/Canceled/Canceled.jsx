import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '~/components/Modal';
import { getCoachingRequestsAsync } from '~/features/clientSlice';
import styles from './Canceled.module.scss';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

const Canceled = () => {
    const dispatch = useDispatch();
    const { coachingRequests, totalCount, pageSize } = useSelector((state) => state.client);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCoachingRequestsAsync({ pageIndex: currentPage, pageSize: 18, clientRequestStatus: 'Canceled' }));
    }, [dispatch, currentPage]);

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setIsViewDetails(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper')}>
                {coachingRequests && coachingRequests.length > 0 ? (
                    <div className={cx('request-list')}>
                        {coachingRequests.map((request) => (
                            <div className={cx('request-item')} key={request.id}>
                                <div className={cx('card')}>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'coach')}>Huấn luyện viên</span>
                                        <span>{request.coachName}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'course-name')}>Gói tập</span>
                                        <span>{request.courseName}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'duration')}>Số buổi</span>
                                        <span>{request.duration}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'price')}>Giá</span>
                                        <span>{request.price}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'discount')}>Giảm giá</span>
                                        <span>{request.discount ? request.discount : 0}%</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'pay')}>Thành tiền</span>
                                        <span>{request.priceToPay}</span>
                                    </div>
                                </div>
                                <div className={cx('action')}>
                                    <button id={cx('view-detail-btn')} onClick={() => handleViewDetails(request)}>
                                        Xem lý do
                                    </button>
                                </div>
                            </div>
                        ))}
                        <Pagination
                            className={cx('pagination-bar')}
                            currentPage={currentPage}
                            totalCount={totalCount}
                            pageSize={pageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                ) : (
                    <div className={cx('request-empty')}>
                        <h2>Hiện chưa có yêu cầu nào!</h2>
                    </div>
                )}
            </div>

            {isViewDetails && (
                <Modal
                    id={cx('delete-modal')}
                    show={isViewDetails}
                    onClose={() => setIsViewDetails(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ color: 'var(--white-color)', cursor: 'pointer' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Lý do hủy gói tập !</h2>
                        <textarea className={cx('reason')} defaultValue={selectedRequest.cancelReason} readOnly />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Canceled;

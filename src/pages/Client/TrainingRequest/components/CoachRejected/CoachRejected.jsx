import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '~/components/Modal';
import { getCoachingRequestsAsync } from '~/features/clientSlice';
import styles from './CoachRejected.module.scss';
import Pagination from '~/components/Pagination';
import Spinner from '~/layouts/components/Spinner';
import { AiOutlineSearch } from 'react-icons/ai';
import useDebounce from '~/hooks/useDebounce';
const cx = classNames.bind(styles);

const CoachRejected = () => {
    const dispatch = useDispatch();
    const { coachingRequests, totalCount, pageSize, loading } = useSelector((state) => state.client);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        dispatch(
            getCoachingRequestsAsync({ pageIndex: currentPage, pageSize: 6, clientRequestStatus: 'CoachRejected' }),
        );
    }, [dispatch, currentPage]);

    const filteredRequests = coachingRequests.filter((request) =>
        request.coachName.toLowerCase().includes(debounced.toLowerCase()),
    );

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setIsViewDetails(true);
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <div className={cx('wrapper')}>
                    {coachingRequests && coachingRequests.length > 0 ? (
                        <>
                            <form className={cx('search')}>
                                <div className={cx('search-box')} type="submit">
                                    <AiOutlineSearch className={cx('search-icon')} />
                                    <input
                                        type="text"
                                        placeholder="Huấn luyện viên"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </form>
                            <div className={cx('request-list')}>
                                {filteredRequests.map((request) => (
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
                                            <button
                                                id={cx('view-detail-btn')}
                                                onClick={() => handleViewDetails(request)}
                                            >
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
                        </>
                    ) : (
                        <div className={cx('request-empty')}>
                            <h2>Hiện chưa có yêu cầu nào!</h2>
                        </div>
                    )}
                </div>
            )}

            {isViewDetails && (
                <Modal
                    id={cx('view-detail-modal')}
                    show={isViewDetails}
                    onClose={() => setIsViewDetails(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ color: 'var(--white-color)', cursor: 'pointer' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Lý do bị từ chối gói tập !</h2>
                        <textarea className={cx('reason')} defaultValue={selectedRequest.rejectReason} readOnly />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CoachRejected;

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '~/components/Modal';
import { getCoachingRequestsAsync } from '~/features/clientSlice';
import styles from './Canceled.module.scss';
import Pagination from '~/components/Pagination';
import Spinner from '~/components/Spinner';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Canceled = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { coachingRequests, totalCount, pageSize, loading } = useSelector((state) => state.client);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(getCoachingRequestsAsync({ pageIndex: currentPage, pageSize: 18, clientRequestStatus: 'Canceled' }));
    }, [dispatch, currentPage]);

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setIsViewDetails(true);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(
                getCoachingRequestsAsync({ pageIndex: currentPage, pageSize: 6, clientRequestStatus: 'Canceled' }),
            );
        } else {
            dispatch(
                getCoachingRequestsAsync({
                    pageIndex: currentPage,
                    pageSize: 6,
                    clientRequestStatus: 'Canceled',
                    search: searchValue,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <div className={cx('wrapper')}>
                    <form className={cx('search')} onSubmit={(e) => handleSearch(e)}>
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
                    {coachingRequests && coachingRequests.length > 0 ? (
                        <div className={cx('request-list')}>
                            {coachingRequests.map((request) => (
                                <div className={cx('request-item')} key={request.id}>
                                    <div className={cx('card')}>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'coach')}>Huấn luyện viên</span>
                                            <span className={cx('card-info')}>{request.coachName}</span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'course-name')}>Gói tập</span>
                                            <span className={cx('card-info')}>{request.courseName}</span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'duration')}>Số buổi</span>
                                            <span className={cx('card-info')}>{request.duration}</span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'price')}>Giá</span>
                                            <span className={cx('card-info')}>{request.price}</span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'discount')}>Giảm giá</span>
                                            <span className={cx('card-info')}>
                                                {request.discount ? request.discount : 0}%
                                            </span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'pay')}>Thành tiền</span>
                                            <span className={cx('card-info')}>{request.priceToPay}</span>
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
                            <h2>Không tìm thấy yêu cầu nào!</h2>
                            <Link className={cx('find-link')} to={`/client/${id}/all-coaches`}>
                                Tìm HLV tại đây!
                            </Link>
                        </div>
                    )}
                </div>
            )}

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

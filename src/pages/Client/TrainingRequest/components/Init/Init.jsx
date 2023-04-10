import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ErrorMessage from '~/components/ErrorMessage';
import Modal from '~/components/Modal';
import Spinner from '~/components/Spinner';
import { cancelTrainingRequestAsync, getCoachingRequestsAsync, getPaymentLinkAsync } from '~/features/clientSlice';
import styles from './Init.module.scss';
import Pagination from '~/components/Pagination';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Init = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { coachingRequests, paymentLink, totalCount, pageSize, loading } = useSelector((state) => state.client);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [isCancel, setIsCancel] = useState(false);
    const [isOpenCancelMessage, setIsOpenCancelMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [requestLoading, setRequestLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(getCoachingRequestsAsync({ pageIndex: currentPage, pageSize: 6, clientRequestStatus: 'Init' }))
            .unwrap()
            .then(() => setRequestLoading(false));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (paymentLink) window.location.replace(paymentLink);
    }, [paymentLink]);

    const handlePayment = (request) => {
        setSelectedRequest(request);
        dispatch(getPaymentLinkAsync(request.id));
    };

    const handleOnChangeMessage = (e) => {
        setMessage(e.target.value);
        if (messageError) {
            setMessageError('');
        }
    };

    const handleOpenCancelModal = (request) => {
        setSelectedRequest(request);
        setIsCancel(true);
    };

    const handleOpenCancelMessage = () => {
        setIsCancel(false);
        setIsOpenCancelMessage(true);
    };

    const handleCancelRequest = () => {
        if (!message) {
            setMessageError('Lời nhắn không được để trống');
        } else {
            dispatch(cancelTrainingRequestAsync({ requestId: selectedRequest.id, data: message }))
                .unwrap()
                .then(() => {
                    setIsOpenCancelMessage(false);
                    setMessage('');
                    dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 6, clientRequestStatus: 'Init' }));
                    toast.success('Hủy yêu cầu thành công');
                })
                .catch((error) => {
                    setMessageError(error);
                });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(getCoachingRequestsAsync({ pageIndex: currentPage, pageSize: 6, clientRequestStatus: 'Init' }));
        } else {
            dispatch(
                getCoachingRequestsAsync({
                    pageIndex: currentPage,
                    pageSize: 6,
                    clientRequestStatus: 'Init',
                    search: searchValue,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            {requestLoading ? (
                <Spinner />
            ) : (
                <>
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
                                        {loading && selectedRequest === request ? (
                                            <Spinner />
                                        ) : (
                                            <>
                                                <button
                                                    id={cx('payment-btn')}
                                                    onClick={() => handlePayment(request)}
                                                    disabled={loading}
                                                >
                                                    Thanh toán
                                                </button>
                                                <button
                                                    id={cx('canceled-btn')}
                                                    onClick={() => handleOpenCancelModal(request)}
                                                    disabled={loading}
                                                >
                                                    Hủy
                                                </button>
                                            </>
                                        )}
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
                </>
            )}

            {isCancel && (
                <Modal
                    open={isCancel}
                    onClose={() => setIsCancel(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>
                            Bạn đồng ý hủy gói tập{' '}
                            <span style={{ color: '#1A97CC' }}>{selectedRequest.courseName}</span> của huấn luyện viên{' '}
                            <span style={{ color: 'var(--primary-color)' }}>{selectedRequest.coachName}</span>?
                        </h2>
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type="submit" onClick={handleOpenCancelMessage}>
                                <BsCheckLg />
                                <span>Đồng ý</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setIsCancel(false)}>
                                <BsXLg />
                                <span>Hủy bỏ</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {isOpenCancelMessage && (
                <Modal
                    open={isOpenCancelMessage}
                    onClose={() => setIsCancel(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Vui lòng nhập lời nhắn cho huấn luyện viên!</h2>
                        <div className={cx('message-frame')}>
                            <textarea name="message" id="message" value={message} onChange={handleOnChangeMessage} />
                        </div>
                        {messageError && (
                            <div className={cx('error')}>
                                <ErrorMessage message={messageError} />
                            </div>
                        )}
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type="submit" onClick={handleCancelRequest}>
                                <BsCheckLg />
                                <span>Gửi</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setIsOpenCancelMessage(false)}>
                                <BsXLg />
                                <span>Hủy bỏ</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Init;

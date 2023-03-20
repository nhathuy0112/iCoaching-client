import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ErrorMessage from '~/components/ErrorMessage';
import Modal from '~/components/Modal';
import { cancelTrainingRequestAsync, getCoachingRequestsAsync } from '~/features/clientSlice';
import styles from './Init.module.scss';

const cx = classNames.bind(styles);

const Init = () => {
    const dispatch = useDispatch();
    const { coachingRequests } = useSelector((state) => state.client);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [isCancel, setIsCancel] = useState(false);
    const [isOpenCancelMessage, setIsOpenCancelMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 6, clientRequestStatus: 'Init' }));
    }, [dispatch]);

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

    return (
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
                            </div>
                            <div className={cx('action')}>
                                <button id={cx('payment-btn')}>Thanh toán</button>
                                <button id={cx('canceled-btn')} onClick={() => handleOpenCancelModal(request)}>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('request-empty')}>
                    <h2>Hiện chưa có yêu cầu nào!</h2>
                </div>
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

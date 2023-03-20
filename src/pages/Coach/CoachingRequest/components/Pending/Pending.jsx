import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorMessage from '~/components/ErrorMessage';
import Modal from '~/components/Modal';
import { getCoachingRequestsAsync, updateCoachingRequestAsync } from '~/features/coachSlice';
import { handleRenderGenders } from '~/utils/gender';
import styles from './Pending.module.scss';

const cx = classNames.bind(styles);

const Pending = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { coachingRequests } = useSelector((state) => state.coach);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [isViewMessage, setIsViewMessage] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const [isOpenAcceptMessage, setIsOpenAcceptMessage] = useState(false);
    const [isReject, setIsReject] = useState(false);
    const [isOpenRejectMessage, setIsOpenRejectMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 7, coachRequestStatus: 'Pending' }));
    }, [dispatch]);

    const handleViewRequestMessage = (request) => {
        setSelectedRequest(request);
        setIsViewMessage(true);
    };

    const handleOnChangeMessage = (e) => {
        setMessage(e.target.value);
        if (messageError) {
            setMessageError('');
        }
    };

    const handleOpenRejectModal = (request) => {
        setSelectedRequest(request);
        setIsReject(true);
    };

    const handleOpenRejectMessage = () => {
        setIsReject(false);
        setIsOpenRejectMessage(true);
    };

    const handleRejectRequest = () => {
        if (!message) {
            setMessageError('Lời nhắn không được để trống');
        } else {
            dispatch(updateCoachingRequestAsync({ requestId: selectedRequest.id, options: 'Reject', data: message }))
                .unwrap()
                .then(() => {
                    setIsOpenRejectMessage(false);
                    setMessage('');
                    dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 6, coachRequestStatus: 'Pending' }));
                    toast.success('Từ chối yêu cầu thành công');
                })
                .catch((error) => {
                    setMessageError(error);
                });
        }
    };

    const handleOpenAcceptModal = (request) => {
        setSelectedRequest(request);
        setIsAccept(true);
    };

    const handleOpenAcceptMessage = () => {
        setIsAccept(false);
        setIsOpenAcceptMessage(true);
    };

    const handleAcceptRequest = () => {
        if (!message) {
            setMessageError('Lời nhắn không được để trống');
        } else {
            dispatch(updateCoachingRequestAsync({ requestId: selectedRequest.id, options: 'Accept', data: message }))
                .unwrap()
                .then(() => {
                    setIsOpenAcceptMessage(false);
                    setMessage('');
                    dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 6, coachRequestStatus: 'Pending' }));
                    toast.success('Chấp nhận yêu cầu thành công');
                    navigate(`/coach/${id}/my-clients`);
                })
                .catch((error) => {
                    setMessageError(error);
                });
        }
    };

    return (
        <div className={cx('wrapper')}>
            {coachingRequests && coachingRequests.length > 0 ? (
                <>
                    <form className={cx('search')}>
                        <div className={cx('search-box')} type="submit">
                            <AiOutlineSearch className={cx('search-icon')} />
                            <input type="text" placeholder="Tìm kiếm" />
                        </div>
                    </form>

                    <table id={cx('request-table')}>
                        <thead>
                            <tr className={cx('header-row')}>
                                <th>Khách hàng</th>
                                <th>Tuổi</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Gói tập</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coachingRequests.map((request) => (
                                <tr className={cx('content-row')} key={request.id}>
                                    <td className={cx('name')}>
                                        <div className={cx('avatar')}>
                                            <img
                                                src={require('../../../../../assets/images/coach-avatar.png')}
                                                alt=""
                                            />
                                        </div>
                                        <span>{request.clientName}</span>
                                    </td>
                                    <td>{request.age}</td>
                                    <td>{handleRenderGenders(request.gender)}</td>
                                    <td>{request.email}</td>
                                    <td>{request.phoneNumber}</td>
                                    <td>{request.courseName}</td>
                                    <td className={cx('action-btn')}>
                                        <button
                                            id={cx('btn-view-message')}
                                            onClick={() => handleViewRequestMessage(request)}
                                        >
                                            Lời nhắn
                                        </button>
                                        <button id={cx('btn-accept')} onClick={() => handleOpenAcceptModal(request)}>
                                            Đồng ý
                                        </button>
                                        <button id={cx('btn-refuse')} onClick={() => handleOpenRejectModal(request)}>
                                            Từ chối
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className={cx('request-empty')}>
                    <h2>Hiện chưa có yêu cầu nào!</h2>
                </div>
            )}

            {isViewMessage && (
                <Modal
                    id={cx('view-message-modal')}
                    show={isViewMessage}
                    onClose={() => setIsViewMessage(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ color: 'var(--white-color)', cursor: 'pointer' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Lời nhắn từ khách hàng</h2>
                        <textarea className={cx('reason')} defaultValue={selectedRequest.clientMessage} readOnly />
                    </div>
                </Modal>
            )}

            {isAccept && (
                <Modal
                    open={isAccept}
                    onClose={() => setIsAccept(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>
                            Bạn đồng ý yêu cầu từ khách hàng{' '}
                            <span style={{ color: '#1A97CC' }}>{selectedRequest.clientName}</span>?
                        </h2>
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type="submit" onClick={handleOpenAcceptMessage}>
                                <BsCheckLg />
                                <span>Đồng ý</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setIsAccept(false)}>
                                <BsXLg />
                                <span>Hủy bỏ</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {isOpenAcceptMessage && (
                <Modal
                    open={isOpenAcceptMessage}
                    onClose={() => setIsAccept(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Vui lòng nhập lời nhắn cho khách hàng!</h2>
                        <div className={cx('message-frame')}>
                            <textarea name="message" id="message" value={message} onChange={handleOnChangeMessage} />
                        </div>
                        {messageError && (
                            <div className={cx('error')}>
                                <ErrorMessage message={messageError} />
                            </div>
                        )}
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type="submit" onClick={() => handleAcceptRequest()}>
                                <BsCheckLg />
                                <span>Gửi</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setIsOpenAcceptMessage(false)}>
                                <BsXLg />
                                <span>Hủy bỏ</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {isReject && (
                <Modal
                    open={isReject}
                    onClose={() => setIsReject(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>
                            Bạn từ chối gói tập <span style={{ color: '#1A97CC' }}>{selectedRequest.courseName}</span>?
                        </h2>
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type="submit" onClick={handleOpenRejectMessage}>
                                <BsCheckLg />
                                <span>Đồng ý</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setIsReject(false)}>
                                <BsXLg />
                                <span>Hủy bỏ</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {isOpenRejectMessage && (
                <Modal
                    open={isOpenRejectMessage}
                    onClose={() => setIsReject(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Vui lòng nhập lời nhắn cho khách hàng!</h2>
                        <div className={cx('message-frame')}>
                            <textarea name="message" id="message" value={message} onChange={handleOnChangeMessage} />
                        </div>
                        {messageError && (
                            <div className={cx('error')}>
                                <ErrorMessage message={messageError} />
                            </div>
                        )}
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type="submit" onClick={() => handleRejectRequest()}>
                                <BsCheckLg />
                                <span>Gửi</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setIsOpenRejectMessage(false)}>
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

export default Pending;

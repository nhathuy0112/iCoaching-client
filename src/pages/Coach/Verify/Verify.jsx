import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Verify.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getCertificationAsync } from '~/features/coachSlice';

import SuccessMessage from '~/components/SuccessMessage';
import ErrorMessage from '~/components/ErrorMessage';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);

const Verify = () => {
    const dispatch = useDispatch();
    const { currentCertificationRequest } = useSelector((state) => state.coach);
    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isViewReason, setIsViewReason] = useState(false);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/coach/${currentUser.Id}/verify`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getCertificationAsync());
    }, [dispatch]);

    const handleRenderMessageByStatus = (status) => {
        switch (status) {
            case 'Accepted':
                return (
                    <div className={cx('message')}>
                        <SuccessMessage
                            message={'Chứng chỉ của bạn đã được xác nhận. Bạn có thể tham gia huấn luyện'}
                        />
                    </div>
                );
            case 'Pending':
                return (
                    <div className={cx('message')}>
                        <SuccessMessage message={'Chứng chỉ của bạn đang chờ được Quản lý xác nhận'} />
                    </div>
                );
            case 'Denied':
                return (
                    <div className={cx('message', 'denied')}>
                        <ErrorMessage message={'Chứng chỉ của bạn không hợp lệ. Vui lòng cập nhật lại'} />
                        <Link to="update-certification" className={cx('update-link')}>
                            Cập nhật tại đây
                        </Link>
                    </div>
                );
            default:
                return;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {!currentCertificationRequest ? (
                    <div className={cx('notification')}>
                        <p>Bạn cần xác minh mình là Huấn luyện viên trước khi tham gia huấn luyện cho khách hàng !</p>
                        <p>Vui lòng cập nhật ít nhất 1 ảnh của giấy tờ tùy thân và 1 ảnh của chứng chỉ huấn luyện !</p>
                        <Link to="update-certification" className={cx('update-link')}>
                            Cập nhật tại đây
                        </Link>
                    </div>
                ) : (
                    <div className={cx('certification-list')}>
                        <div className={cx('status')}>
                            {handleRenderMessageByStatus(currentCertificationRequest?.status)}
                        </div>
                        <div className={cx('info-group')}>
                            <h3 className={cx('title')}>Giấy tờ tùy thân</h3>
                            <div className={cx('image-list')}>
                                {currentCertificationRequest?.idUrls?.map((image) => (
                                    <div key={image} className={cx('image-item')}>
                                        <img src={image} alt="" width="100" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('info-group')}>
                            <h3 className={cx('title')}>Chứng chỉ huấn luyện</h3>
                            <div className={cx('image-list')}>
                                {currentCertificationRequest?.certUrls?.map((image) => (
                                    <div key={image} className={cx('image-item')}>
                                        <img src={image} alt="" width="100" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {currentCertificationRequest?.status === 'Denied' && (
                            <div className={cx('action-btn')}>
                                <button
                                    id={cx('view-reason-btn')}
                                    onClick={() => {
                                        setIsViewReason(true);
                                    }}
                                >
                                    Xem lý do
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isViewReason && (
                <Modal
                    id={cx('view-reason-modal')}
                    show={isViewReason}
                    onClose={() => setIsViewReason(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ color: 'var(--white-color)', cursor: 'pointer' }}
                    s
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Lý do bị từ chối yêu cầu!</h2>
                        <textarea
                            className={cx('reason')}
                            defaultValue={currentCertificationRequest?.reason}
                            readOnly
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Verify;

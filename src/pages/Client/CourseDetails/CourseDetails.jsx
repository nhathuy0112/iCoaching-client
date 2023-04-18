import classNames from 'classnames/bind';
import styles from './CourseDetails.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCoachTrainingCourseDetailsAsync } from '~/features/guestSlice';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import Modal from '~/components/Modal/Modal';
import { getAllVouchersAsync, resetError, sendCoachingRequestAsync } from '~/features/clientSlice';
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage';
import Spinner from '~/components/Spinner';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const CourseDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id, coachId, courseId } = useParams();
    const { currentTrainingCourse } = useSelector((state) => state.guest);
    const { vouchers, loading } = useSelector((state) => state.client);
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [isSendMessage, setIsSendMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [voucherCode, setVoucherCode] = useState('');
    const [detailLoading, setDetailLoading] = useState(true);

    useEffect(() => {
        dispatch(getCoachTrainingCourseDetailsAsync({ coachId: coachId, courseId: courseId }))
            .unwrap()
            .then(() => setDetailLoading(false));
    }, [dispatch, coachId, courseId]);

    useEffect(() => {
        dispatch(getAllVouchersAsync());
    }, [dispatch]);

    const handleViewDetailsModal = () => {
        setIsViewDetails(true);
    };

    const handleOnChangeMessage = (e) => {
        setMessage(e.target.value);
        if (messageError) {
            setMessageError('');
        }
    };

    const handleSendRequestClick = () => {
        setIsViewDetails(false);
        setIsSendMessage(true);
    };

    const handleSendRequestCoaching = () => {
        if (!message) {
            setMessageError('Lời nhắn không được để trống');
        } else {
            dispatch(
                sendCoachingRequestAsync({
                    coachId: coachId,
                    courseId: courseId,
                    voucherCode: voucherCode,
                    data: message,
                }),
            )
                .unwrap()
                .then(() => {
                    setIsSendMessage(false);
                    setMessage('');
                    navigate(`/client/${id}/training-requests`);
                    toast.success('Yêu cầu tập luyện thành công!');
                })
                .catch((error) => {
                    setMessageError(error);
                });
        }
    };

    const handleCloseRequestCoaching = () => {
        dispatch(resetError());
        setIsSendMessage(false);
        setMessageError('');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('frame')}>
                    <div className={cx('back')}>
                        <Link
                            to={
                                location.pathname.startsWith(`/client/${id}/all-coaches`)
                                    ? `/client/${id}/all-coaches/view-details/coach/${coachId}`
                                    : `/client/${id}/view-details/coach/${coachId}`
                            }
                            className={cx('back-link')}
                        >
                            <IoIosArrowBack />
                            <span>Quay lại</span>
                        </Link>
                    </div>
                    <h2 className={cx('title')}>Thông tin gói tập</h2>
                    {detailLoading ? (
                        <Spinner />
                    ) : (
                        <div className={cx('main')}>
                            <div className={cx('info-frame')}>
                                <div className={cx('info-group')}>
                                    <label htmlFor="">Tên gói tập</label>
                                    <span>{currentTrainingCourse.name}</span>
                                </div>
                                <div className={cx('info-group')}>
                                    <label htmlFor="">Số buổi</label>
                                    <span>{currentTrainingCourse.duration}</span>
                                </div>
                                <div className={cx('info-group')}>
                                    <label htmlFor="">Giá</label>
                                    <span>{currentTrainingCourse.price}</span>
                                </div>
                                <div className={cx('info-group', 'description')}>
                                    <label htmlFor="">Mô tả</label>
                                    <div dangerouslySetInnerHTML={{ __html: currentTrainingCourse.description }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentTrainingCourse.isClientRequested && (
                        <div className={cx('error')}>
                            <ErrorMessage message="Bạn đã gửi yêu cầu hoặc đang tập luyện 1 khóa của HLV này" />
                        </div>
                    )}
                    <button
                        className={
                            !currentTrainingCourse.isClientRequested
                                ? cx('register-btn')
                                : cx('register-btn', 'disabled')
                        }
                        onClick={handleViewDetailsModal}
                    >
                        <span>Đăng ký</span>
                    </button>
                </div>
            </div>
            {isViewDetails && (
                <Modal
                    open={isViewDetails}
                    onClose={() => setIsViewDetails(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('body')}>
                        <h1 className={cx('title')}>iCoaching</h1>
                        <h2 className={cx('sub-title')}>
                            Bạn có đồng ý gửi yêu cầu cho huấn luyện viên về gói tập này?
                        </h2>
                        <div className={cx('button')}>
                            <button className={cx('btn-confirm')} onClick={handleSendRequestClick}>
                                <BsCheckLg className={cx('icon')} />
                                Đồng ý
                            </button>
                            <button className={cx('btn-warn')} onClick={() => setIsViewDetails(false)}>
                                <BsXLg className={cx('icon')} /> Huỷ bỏ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {isSendMessage && (
                <Modal
                    open={isSendMessage}
                    onClose={() => setIsSendMessage(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('body')}>
                        <h1 className={cx('title')}>iCoaching</h1>
                        <h2 className={cx('sub-title')}>
                            Vui lòng chọn Mã giảm giá (nếu có) và gửi lời nhắn cho Huấn luyện viên!
                        </h2>
                        <div className={cx('input-group')}>
                            <label htmlFor="">Mã giảm giá</label>
                            <select name="" id="" defaultValue="" onChange={(e) => setVoucherCode(e.target.value)}>
                                <option value="" disabled>
                                    -- Chọn mã giảm giá --{' '}
                                </option>
                                {vouchers.map((voucher) => {
                                    const priceNeedToPay =
                                        parseInt(currentTrainingCourse.price.replace(/[^0-9]/g, '')) -
                                        (parseFloat(voucher.discount) / 100) *
                                            parseInt(currentTrainingCourse.price.replace(/[^0-9]/g, ''));
                                    const validPaymentPrice = priceNeedToPay > 10000 || priceNeedToPay === 0;
                                    if (!voucher.isUsed && validPaymentPrice) {
                                        return (
                                            <option key={voucher.id} value={voucher.code}>
                                                {voucher.code} - {voucher.discount}
                                            </option>
                                        );
                                    }
                                    return null;
                                })}
                            </select>
                        </div>
                        <div className={cx('input-group')}>
                            <label htmlFor="">Lời nhắn cho HLV</label>
                            <div className={cx('message-frame')}>
                                <textarea
                                    name="message"
                                    id="message"
                                    value={message}
                                    onChange={handleOnChangeMessage}
                                />
                            </div>
                            {messageError && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={messageError} />
                                </div>
                            )}
                        </div>
                        <div className={cx('button')}>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <>
                                    <button className={cx('btn-confirm')} onClick={handleSendRequestCoaching}>
                                        <BsCheckLg className={cx('icon')} />
                                        Gửi
                                    </button>
                                    <button className={cx('btn-warn')} onClick={handleCloseRequestCoaching}>
                                        <BsXLg className={cx('icon')} /> Huỷ bỏ
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CourseDetails;

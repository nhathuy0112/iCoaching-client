import styles from './TrainingCourse.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachTrainingCourseAsync, getCoachTrainingCourseDetailsAsync } from '~/features/guestSlice';
import {
    getAllVouchersAsync,
    getCoachingRequestsAsync,
    resetError,
    sendCoachingRequestAsync,
} from '~/features/clientSlice';
import TrainingCourseCard from '~/components/TrainingCourseCard';
import Pagination from '~/components/Pagination';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import Modal from '~/components/Modal';
import ErrorMessage from '~/components/ErrorMessage';

const cx = classNames.bind(styles);

const TrainingCourse = () => {
    const { id, coachId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { trainingCourses, totalCount, pageSize } = useSelector((state) => state.guest);
    const { vouchers } = useSelector((state) => state.client);
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [isSendMessage, setIsSendMessage] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState({});
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [voucherCode, setVoucherCode] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCoachTrainingCourseAsync({ coachId: coachId, pageIndex: currentPage, pageSize: 9 }));
    }, [dispatch, currentPage, coachId]);

    useEffect(() => {
        dispatch(getAllVouchersAsync());
    }, [dispatch]);

    const handleViewDetailsModal = (course) => {
        setIsViewDetails(true);
        dispatch(getCoachTrainingCourseDetailsAsync({ coachId: coachId, courseId: course.id }))
            .unwrap()
            .then((response) => {
                setSelectedCourse(response);
            });
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
                    courseId: selectedCourse.id,
                    voucherCode: voucherCode,
                    data: message,
                }),
            )
                .unwrap()
                .then(() => {
                    setIsSendMessage(false);
                    setMessage('');
                    dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 6, clientRequestStatus: 'Init' }));
                    navigate(`/client/${id}/training-requests`);
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
                {trainingCourses && trainingCourses.length > 0 ? (
                    <div className={cx('course-list')}>
                        {trainingCourses.map((course) => (
                            <div className={cx('course-item')} key={course.id}>
                                <TrainingCourseCard course={course} />
                                <div className={cx('item-action')}>
                                    <button id={cx('view-detail-btn')} onClick={() => handleViewDetailsModal(course)}>
                                        Xem chi tiết
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
                    <div className={cx('course-empty')}>
                        <h3 className={cx('message')}>Huấn luyện viên này chưa có gói tập nào!</h3>
                        <Link className={cx('find-link')} to={`/client/${id}/all-coaches`}>
                            Tìm HLV khác!
                        </Link>
                    </div>
                )}
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
                        <div className={cx('course-detail')}>
                            <div className={cx('info-group')}>
                                <label>Tên gói tập</label>
                                <span>{selectedCourse.name}</span>
                            </div>
                            <div className={cx('info-group')}>
                                <label>Số buổi</label>
                                <span>{selectedCourse.duration}</span>
                            </div>
                            <div className={cx('info-group')}>
                                <label>Giá</label>
                                <span>{selectedCourse.price}</span>
                            </div>
                            <div className={cx('info-group', 'description')}>
                                <label>Mô tả khóa tập</label>
                                <div dangerouslySetInnerHTML={{ __html: selectedCourse.description }}></div>
                            </div>
                        </div>
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
                                <option value="">-- Chọn mã giảm giá -- </option>
                                {vouchers.map((voucher) => {
                                    if (!voucher.isUsed) {
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
                            <button className={cx('btn-confirm')} onClick={handleSendRequestCoaching}>
                                <BsCheckLg className={cx('icon')} />
                                Gửi
                            </button>
                            <button className={cx('btn-warn')} onClick={handleCloseRequestCoaching}>
                                <BsXLg className={cx('icon')} /> Huỷ bỏ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TrainingCourse;

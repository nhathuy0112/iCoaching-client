import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TrainingCourseCard.module.scss';
import Modal from '~/components/Modal';

import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Login from '~/auth/Login';
import Register from '~/auth/Register';
import ForgotPassword from '~/auth/ForgotPassword';
import { useNavigate, useParams } from 'react-router-dom';
import { getCoachingRequestsAsync, resetError, sendCoachingRequestAsync } from '~/features/clientSlice';
import ErrorMessage from '../ErrorMessage';

const cx = classNames.bind(styles);

const TrainingCourseCard = ({ course }) => {
    const { id, name, price, duration, description } = course;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [forgotOpen, setForgotOpen] = useState(false);
    const [isSendMessage, setIsSendMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const { coachId } = useParams();

    const handleViewDetailsClick = () => {
        setIsViewDetails(true);
    };

    const handleClose = () => {
        setIsViewDetails(false);
    };

    const handleLogin = () => {
        setLoginOpen(true);
    };

    const handleSendRequestClick = () => {
        if (currentUser) {
            setIsViewDetails(false);
            setIsSendMessage(true);
        } else {
            handleLogin();
        }
    };

    const handleOnChangeMessage = (e) => {
        setMessage(e.target.value);
        if (messageError) {
            setMessageError('');
        }
    };

    const handleSendRequestCoaching = () => {
        if (!message) {
            setMessageError('Lời nhắn không được để trống');
        } else {
            dispatch(sendCoachingRequestAsync({ coachId: coachId, courseId: id, data: message }))
                .unwrap()
                .then(() => {
                    setIsSendMessage(false);
                    setMessage('');
                    dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 6, clientRequestStatus: 'Init' }));
                    navigate(`/client/${currentUser.Id}/training-requests`);
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
        <div className={cx('card')}>
            <h3 className={cx('name')}>{name}</h3>
            <span className={cx('price')}>{price}</span>
            {currentUser?.role !== 'COACH' && (
                <button className={cx('detail-btn')} onClick={handleViewDetailsClick}>
                    Xem chi tiết
                </button>
            )}

            {isViewDetails && (
                <Modal open={isViewDetails} onClose={handleClose} modalStyle={{}} closeBtnStyle={{ display: 'none' }}>
                    <div className={cx('body')}>
                        <h1>iCoaching</h1>
                        <h2>Bạn có đồng ý gửi yêu cầu cho huấn luyện viên về gói tập này?</h2>
                        <div className={cx('course-detail')}>
                            <div>
                                <label>Tên gói tập</label>
                                <span>{name}</span>
                            </div>
                            <div>
                                <label>Số buổi</label>
                                <span>{duration}</span>
                            </div>
                            <div>
                                <label>Giá</label>
                                <span>{price}</span>
                            </div>
                            <div>
                                <label>Mô tả khóa tập</label>
                                <span>{description}</span>
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
            <Login open={loginOpen} setLoginOpen={setLoginOpen}></Login>
            <Register open={registerOpen} setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen}></Register>
            <ForgotPassword open={forgotOpen} setForgotOpen={setForgotOpen} setLoginOpen={setLoginOpen} />

            {isSendMessage && (
                <Modal open={isSendMessage} onClose={handleClose} modalStyle={{}} closeBtnStyle={{ display: 'none' }}>
                    <div className={cx('body')}>
                        <h1>iCoaching</h1>
                        <h2>Vui lòng gửi lời nhắn cho huấn luyện viên !</h2>
                        <div className={cx('message-frame')}>
                            <textarea name="message" id="message" value={message} onChange={handleOnChangeMessage} />
                        </div>
                        {messageError && (
                            <div className={cx('error')}>
                                <ErrorMessage message={messageError} />
                            </div>
                        )}
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

export default TrainingCourseCard;

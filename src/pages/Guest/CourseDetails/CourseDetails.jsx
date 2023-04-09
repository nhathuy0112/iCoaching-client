import classNames from 'classnames/bind';
import styles from './CourseDetails.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCoachTrainingCourseDetailsAsync } from '~/features/guestSlice';
import Login from '~/auth/Login/Login';
import Register from '~/auth/Register/Register';
import ForgotPassword from '~/auth/ForgotPassword/ForgotPassword';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

const CourseDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { coachId, courseId } = useParams();
    const { currentTrainingCourse, loading } = useSelector((state) => state.guest);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [forgotOpen, setForgotOpen] = useState(false);

    useEffect(() => {
        dispatch(getCoachTrainingCourseDetailsAsync({ coachId: coachId, courseId: courseId }));
    }, [dispatch, coachId, courseId]);

    const handleLogin = () => {
        setLoginOpen(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('frame')}>
                    <div className={cx('title-and-back')}>
                        <div className={cx('back')}>
                            <Link
                                to={
                                    location.pathname.startsWith('/all-coaches')
                                        ? `/all-coaches/view-details/coach/${coachId}`
                                        : `/view-details/coach/${coachId}`
                                }
                                className={cx('back-link')}
                            >
                                <IoIosArrowBack />
                                <span>Quay lại</span>
                            </Link>
                        </div>
                        <h1 className={cx('title')}>Thông tin gói tập</h1>
                    </div>
                    {loading ? (
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
                    <button id={cx('register-btn')} onClick={handleLogin}>
                        Đăng ký
                    </button>
                </div>
            </div>
            <Login
                open={loginOpen}
                setLoginOpen={setLoginOpen}
                setRegisterOpen={setRegisterOpen}
                setForgotOpen={setForgotOpen}
            ></Login>
            <Register open={registerOpen} setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen}></Register>
            <ForgotPassword open={forgotOpen} setForgotOpen={setForgotOpen} setLoginOpen={setLoginOpen} />
        </div>
    );
};

export default CourseDetails;

import styles from './TrainingCourse.module.scss';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachTrainingCourseAsync, getCoachTrainingCourseDetailsAsync } from '~/features/guestSlice';
import TrainingCourseCard from '~/components/TrainingCourseCard';
import Pagination from '~/components/Pagination';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import Modal from '~/components/Modal';
import Login from '~/auth/Login';
import Register from '~/auth/Register';
import ForgotPassword from '~/auth/ForgotPassword';

const cx = classNames.bind(styles);

const TrainingCourse = () => {
    const { coachId } = useParams();
    const dispatch = useDispatch();
    const { trainingCourses, totalCount, pageSize } = useSelector((state) => state.guest);
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState({});
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [forgotOpen, setForgotOpen] = useState(false);

    useEffect(() => {
        dispatch(getCoachTrainingCourseAsync({ coachId: coachId, pageIndex: currentPage, pageSize: 9 }));
    }, [dispatch, currentPage, coachId]);

    const handleViewDetailsModal = (course) => {
        setIsViewDetails(true);
        dispatch(getCoachTrainingCourseDetailsAsync({ coachId: coachId, courseId: course.id }))
            .unwrap()
            .then((response) => {
                setSelectedCourse(response);
            });
    };

    const handleLogin = () => {
        setIsViewDetails(false);
        setLoginOpen(true);
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
                        <Link className={cx('link')} to="/all-coaches">
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
                            <button className={cx('btn-confirm')} onClick={handleLogin}>
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

export default TrainingCourse;

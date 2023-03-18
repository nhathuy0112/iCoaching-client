import classNames from 'classnames/bind';
import styles from './OngoingCourse.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTrainingCoursesAsync } from '~/features/clientSlice';

const cx = classNames.bind(styles);

const OnGoingCourse = () => {
    const dispatch = useDispatch();
    const { trainingCourses } = useSelector((state) => state.client);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getTrainingCoursesAsync({ pageIndex: 1, pageSize: 10, status: 'Active' }));
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <Link to={`/client/${id}`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Trang chủ</span>
                </Link>
                <h2 className={cx('header')}>Gói đang tập luyện</h2>
            </div>
            <div className={cx('content')}>
                {trainingCourses && trainingCourses.length > 0 ? (
                    <div className={cx('course-list')}>
                        {trainingCourses.map((course) => (
                            <div className={cx('course-item')} key={course.id}>
                                <div className={cx('card')}>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'course-name')}>Gói tập</span>
                                        <span>{course.courseName}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'coach')}>Huấn luyện viên</span>
                                        <span>{course.coachName}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'gender')}>Giới tính</span>
                                        <span>{course.coachGender}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'email')}>Email</span>
                                        <span>{course.coachEmail}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'phone')}>Sđt</span>
                                        <span>{course.coachPhoneNumber}</span>
                                    </div>
                                </div>
                                <div className={cx('action')}>
                                    <Link
                                        to={`/client/${id}/ongoing-course/view-details/${course.id}`}
                                        id={cx('view-detail-link')}
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={cx('course-empty')}>
                        <h3 className={cx('message')}>Hiện chưa có gói tập nào!</h3>
                        <Link className={cx('find-link')} to={`/client/${id}/all-coaches`}>
                            Tìm HLV tại đây!
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnGoingCourse;

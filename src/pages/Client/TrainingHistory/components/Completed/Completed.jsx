import classNames from 'classnames/bind';
import styles from './Completed.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleRenderGenders } from '~/utils/gender';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { getTrainingCoursesAsync } from '~/features/clientSlice';

const cx = classNames.bind(styles);

const Completed = () => {
    const dispatch = useDispatch();
    const { trainingCourses, totalCount, pageSize } = useSelector((state) => state.client);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getTrainingCoursesAsync({ pageIndex: currentPage, pageSize: 15, status: 'Complete' }));
    }, [dispatch, currentPage]);

    return (
        <div className={cx('wrapper')}>
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
                                    <span>{handleRenderGenders(course.coachGender)}</span>
                                </div>
                                <div className={cx('card-content')}>
                                    <span className={cx('card-title', 'email')}>Email</span>
                                    <span>{course.coachEmail}</span>
                                </div>
                                <div className={cx('card-content')}>
                                    <span className={cx('card-title', 'phone')}>Số điện thoại</span>
                                    <span>{course.coachPhoneNumber}</span>
                                </div>
                            </div>
                            <div className={cx('action')}>
                                <Link
                                    to={`/client/${id}/training-history/view-details/${course.id}`}
                                    id={cx('view-detail-link')}
                                >
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    ))}
                    {/* <Pagination
                            className={cx('pagination-bar')}
                            currentPage={currentPage}
                            totalCount={totalCount}
                            pageSize={pageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        /> */}
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
    );
};

export default Completed;

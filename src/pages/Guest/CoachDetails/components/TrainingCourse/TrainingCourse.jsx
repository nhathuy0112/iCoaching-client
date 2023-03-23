import styles from './TrainingCourse.module.scss';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachTrainingCourseAsync } from '~/features/guestSlice';
import TrainingCourseCard from '~/components/TrainingCourseCard';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

const TrainingCourse = () => {
    const { coachId } = useParams();
    const dispatch = useDispatch();
    const { trainingCourses, totalCount, pageSize } = useSelector((state) => state.guest);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCoachTrainingCourseAsync({ coachId: coachId, pageIndex: currentPage, pageSize: 9 }));
    }, [dispatch, currentPage, coachId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {trainingCourses && trainingCourses.length > 0 ? (
                    <div className={cx('course-list')}>
                        {trainingCourses.map((course) => (
                            <div className={cx('course-item')} key={course.id}>
                                <TrainingCourseCard course={course} />
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
        </div>
    );
};

export default TrainingCourse;

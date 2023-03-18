import styles from './TrainingCourse.module.scss';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachTrainingCourseAsync, setPage } from '~/features/guestSlice';
import TrainingCourseCard from '~/components/TrainingCourseCard';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

const TrainingCourse = () => {
    const { id, coachId } = useParams();
    const dispatch = useDispatch();
    const { trainingCourses, totalCount, pageSize, pageIndex } = useSelector((state) => state.guest);

    useEffect(() => {
        dispatch(getCoachTrainingCourseAsync({ coachId: coachId, pageIndex: pageIndex, pageSize: 9 }));
    }, [dispatch, coachId, pageIndex]);

    //Pagination
    const [pageChange, setPageChange] = useState(pageIndex);

    const handlePageChange = (pageNumber) => {
        setPageChange(pageNumber);
        dispatch(setPage(pageNumber));
        dispatch(getCoachTrainingCourseAsync({ coachId: coachId, pageIndex: pageNumber, pageSize: 9 }));
    };

    const currentTrainingCoursesPagination = useMemo(() => {
        return trainingCourses;
    }, [trainingCourses]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {trainingCourses && trainingCourses.length > 0 ? (
                    <div className={cx('course-list')}>
                        {currentTrainingCoursesPagination.map((course) => (
                            <div className={cx('course-item')} key={course.id}>
                                <TrainingCourseCard course={course} />
                            </div>
                        ))}
                        <Pagination
                            className={cx('pagination-bar')}
                            currentPage={pageChange}
                            totalCount={totalCount}
                            pageSize={pageSize}
                            onPageChange={(pageChange) => handlePageChange(pageChange)}
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
        </div>
    );
};

export default TrainingCourse;

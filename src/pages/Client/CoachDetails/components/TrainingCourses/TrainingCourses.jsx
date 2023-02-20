import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import Pagination from '~/components/Pagination';
import styles from './TrainingCourses.module.scss';
import TrainingCourseCard from '~/components/TrainingCourseCard';

const cx = classNames.bind(styles);
const TrainingCourse = () => {
    const renderTrainingCourse = () => {
        const trainingCourses = [];
        for (let i = 1; i <= 35; i++) {
            const course = {
                id: i,
                name: 'Gói 12 ngày',
                price: 10000000,
                duration: 20,
            };
            trainingCourses.push(course);
        }
        return trainingCourses;
    };

    const trainingCourses = renderTrainingCourse();

    //Pagination
    let pageSize = 24;
    const [currentPage, setCurrentPage] = useState(1);

    const currentTrainingCoursesPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return trainingCourses.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, trainingCourses]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('course-list')}>
                {currentTrainingCoursesPagination.map((course) => (
                    <div className={cx('course-item')} key={course.id}>
                        <TrainingCourseCard course={course} />
                    </div>
                ))}

                <Pagination
                    className={cx('pagination-bar')}
                    currentPage={currentPage}
                    totalCount={trainingCourses.length}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default TrainingCourse;

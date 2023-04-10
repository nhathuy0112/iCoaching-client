import styles from './TrainingCourse.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachTrainingCourseAsync } from '~/features/guestSlice';
import TrainingCourseCard from '~/components/TrainingCourseCard';
import Pagination from '~/components/Pagination';
import Spinner from '~/components/Spinner';
import { AiOutlineSearch } from 'react-icons/ai';

const cx = classNames.bind(styles);

const TrainingCourse = () => {
    const { id, coachId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { trainingCourses, totalCount, pageSize, loading } = useSelector((state) => state.guest);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(getCoachTrainingCourseAsync({ coachId: coachId, pageIndex: currentPage, pageSize: 9 }));
    }, [dispatch, currentPage, coachId]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(getCoachTrainingCourseAsync({ coachId: coachId, pageIndex: currentPage, pageSize: 9 }));
        } else {
            dispatch(
                getCoachTrainingCourseAsync({
                    coachId: coachId,
                    pageIndex: currentPage,
                    pageSize: 9,
                    search: searchValue,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <div className={cx('content')}>
                    <form className={cx('search')} onSubmit={(e) => handleSearch(e)}>
                        <div className={cx('search-box')}>
                            <button type="submit">
                                <AiOutlineSearch className={cx('search-icon')} />
                            </button>
                            <input
                                type="text"
                                placeholder="Gói tập"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </form>
                    {trainingCourses && trainingCourses.length > 0 ? (
                        <>
                            <div className={cx('course-list')}>
                                {trainingCourses.map((course) => (
                                    <div className={cx('course-item')} key={course.id}>
                                        <TrainingCourseCard course={course} />
                                        <div className={cx('item-action')}>
                                            <button
                                                id={cx('view-detail-btn')}
                                                onClick={() => navigate(`course/${course.id}`)}
                                            >
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
                        </>
                    ) : (
                        <div className={cx('course-empty')}>
                            <h3 className={cx('message')}>Không tìm thấy gói tập nào!</h3>
                            <Link className={cx('find-link')} to={`/client/${id}/all-coaches`}>
                                Tìm HLV khác!
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TrainingCourse;

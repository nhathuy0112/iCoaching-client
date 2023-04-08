import classNames from 'classnames/bind';
import styles from './Canceled.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleRenderGenders } from '~/utils/gender';
import { useEffect, useState } from 'react';
import { getTrainingCoursesAsync } from '~/features/clientSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

const Canceled = () => {
    const dispatch = useDispatch();
    const { trainingCourses, totalCount, pageSize } = useSelector((state) => state.client);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        dispatch(getTrainingCoursesAsync({ pageIndex: currentPage, pageSize: 15, status: 'Canceled' }));
    }, [dispatch, currentPage]);

    const filteredCourses = trainingCourses.filter((course) =>
        course.courseName.toLowerCase().includes(debounced.toLowerCase()),
    );

    return (
        <div className={cx('wrapper')}>
            {trainingCourses && trainingCourses.length > 0 ? (
                <>
                    <form className={cx('search')}>
                        <div className={cx('search-box')} type="submit">
                            <AiOutlineSearch className={cx('search-icon')} />
                            <input
                                type="text"
                                placeholder="Gói tập"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </form>
                    <div className={cx('course-list')}>
                        {filteredCourses.map((course) => (
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
                </>
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

export default Canceled;

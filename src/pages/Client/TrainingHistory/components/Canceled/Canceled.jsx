import classNames from 'classnames/bind';
import styles from './Canceled.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleRenderGenders } from '~/utils/gender';
import { useEffect, useState } from 'react';
import { getTrainingCoursesAsync } from '~/features/clientSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import Pagination from '~/components/Pagination';
const cx = classNames.bind(styles);

const Canceled = () => {
    const dispatch = useDispatch();
    const { trainingCourses, totalCount, pageSize } = useSelector((state) => state.client);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(getTrainingCoursesAsync({ pageIndex: currentPage, pageSize: 15, status: 'Canceled' }));
    }, [dispatch, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(
                getTrainingCoursesAsync({
                    pageIndex: currentPage,
                    pageSize: 9,
                    status: 'Canceled',
                }),
            );
        } else {
            dispatch(
                getTrainingCoursesAsync({
                    pageIndex: currentPage,
                    pageSize: 9,
                    status: 'Canceled',
                    search: searchValue,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('search')} onSubmit={(e) => handleSearch(e)}>
                <div className={cx('search-box')}>
                    <button type="sumbit">
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
                    <h3 className={cx('message')}>Không tìm thấy gói tập nào!</h3>
                    <Link className={cx('find-link')} to={`/client/${id}/all-coaches`}>
                        Tìm HLV tại đây!
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Canceled;

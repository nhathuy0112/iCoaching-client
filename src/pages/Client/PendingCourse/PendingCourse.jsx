import classNames from 'classnames/bind';
import styles from './PendingCourse.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTrainingCoursesAsync } from '~/features/clientSlice';
import { handleRenderGenders } from '~/utils/gender';
import Pagination from '~/components/Pagination';
import Spinner from '~/components/Spinner';
import { AiOutlineSearch } from 'react-icons/ai';

const cx = classNames.bind(styles);

const PendingCourse = () => {
    const dispatch = useDispatch();
    const { trainingCourses, totalCount, pageSize, loading } = useSelector((state) => state.client);
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/client/${currentUser.Id}/pending-courses`);
            }
        }
    }, [id, currentUser, navigate]);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getTrainingCoursesAsync({ pageIndex: currentPage, pageSize: 10, status: 'Pending' }));
    }, [dispatch, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(
                getTrainingCoursesAsync({
                    pageIndex: currentPage,
                    pageSize: 9,
                    status: 'Pending',
                }),
            );
        } else {
            dispatch(
                getTrainingCoursesAsync({
                    pageIndex: currentPage,
                    pageSize: 9,
                    status: 'Pending',
                    search: searchValue,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <Link to={`/client/${id}`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Trang chủ</span>
                </Link>
                <h2 className={cx('header')}>Gói đang đợi hoàn thành</h2>
            </div>
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
                        <div className={cx('course-list')}>
                            {trainingCourses.map((course) => (
                                <div className={cx('course-item')} key={course.id}>
                                    <div className={cx('card')}>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'course-name')}>Gói tập</span>
                                            <span className={cx('card-info')}>{course.courseName}</span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'coach')}>Huấn luyện viên</span>
                                            <span className={cx('card-info')}>{course.coachName}</span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'gender')}>Giới tính</span>
                                            <span className={cx('card-info')}>
                                                {handleRenderGenders(course.coachGender)}
                                            </span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'email')}>Email</span>
                                            <span className={cx('card-info')}>{course.coachEmail}</span>
                                        </div>
                                        <div className={cx('card-content')}>
                                            <span className={cx('card-title', 'phone')}>Số điện thoại</span>
                                            <span className={cx('card-info')}>{course.coachPhoneNumber}</span>
                                        </div>
                                    </div>
                                    <div className={cx('action')}>
                                        <Link
                                            to={`/client/${id}/pending-courses/view-details/${course.id}`}
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
            )}
        </div>
    );
};

export default PendingCourse;

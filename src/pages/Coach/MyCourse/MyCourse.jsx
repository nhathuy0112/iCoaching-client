import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourse.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import TrainingCourseCard from '~/components/TrainingCourseCard';
import { deleteTrainingCourseAsync, getTrainingCourseAsync } from '~/features/coachSlice';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import 'react-quill/dist/quill.snow.css';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';
import { MdOutlineEdit } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '~/components/Spinner';
import { toast } from 'react-toastify';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

const MyCourse = () => {
    const { trainingCourses, pageSize, totalCount, loading } = useSelector((state) => state.coach);
    const dispatch = useDispatch();
    const [isDelete, setIsDelete] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/coach/${currentUser.Id}/my-courses`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getTrainingCourseAsync({ pageIndex: currentPage, pageSize: 20 }));
    }, [dispatch, currentPage]);

    const filteredCourses = trainingCourses.filter((course) =>
        course.name.toLowerCase().includes(debounced.toLowerCase()),
    );

    const handleOpenDeleteModal = (course) => {
        setIsDelete(true);
        setSelectedCourse(course);
    };

    const handleDeleteCourse = (courseId) => {
        dispatch(deleteTrainingCourseAsync(courseId));
        toast.success('Xóa gói tập thành công!');
        setIsDelete(false);
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {trainingCourses && trainingCourses.length > 0 ? (
                        <>
                            <div className={cx('action')}>
                                <div className={cx('add')}>
                                    <button id={cx('add-btn')} onClick={() => navigate(`/coach/${id}/my-courses/add`)}>
                                        <AiOutlinePlus className={cx('icon')} />
                                        <span>Thêm gói tập</span>
                                    </button>
                                </div>
                            </div>
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
                                        <TrainingCourseCard course={course} />
                                        <div className={cx('item-action')}>
                                            <button
                                                id={cx('edit-btn')}
                                                onClick={() => navigate(`/coach/${id}/my-courses/edit/${course.id}`)}
                                            >
                                                <MdOutlineEdit />
                                            </button>
                                            <button id={cx('delete-btn')} onClick={() => handleOpenDeleteModal(course)}>
                                                <BiTrash />
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
                            <h1>Hiện chưa có gói tập nào!</h1>
                            <button
                                id={cx('add-btn')}
                                onClick={() => navigate(`/coach/${id}/my-courses/add`)}
                                style={{ margin: 'auto' }}
                            >
                                <AiOutlinePlus className={cx('icon')} />
                                <span>Thêm gói tập</span>
                            </button>
                        </div>
                    )}
                </>
            )}

            {isDelete && (
                <Modal
                    id={cx('delete-modal')}
                    show={isDelete}
                    onClose={() => setIsDelete(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>
                            Bạn có đồng ý xóa gói tập <span style={{ color: '#1A97CC' }}>{selectedCourse.name}</span>?
                        </h2>
                        <div className={cx('modal-action')}>
                            <button
                                id={cx('agree-btn')}
                                type="submit"
                                onClick={() => {
                                    handleDeleteCourse(selectedCourse.id);
                                }}
                            >
                                <BsCheckLg />
                                <span>Đồng ý</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setIsDelete(false)}>
                                <BsXLg />
                                <span>Hủy bỏ</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default MyCourse;

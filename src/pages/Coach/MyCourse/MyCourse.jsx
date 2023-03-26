import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrainingCourseCard from '~/components/TrainingCourseCard';
import {
    addTrainingCourseAsync,
    deleteTrainingCourseAsync,
    editTrainingCourseAsync,
    getTrainingCourseAsync,
} from '~/features/coachSlice';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import styles from './MyCourse.module.scss';
import Modal from '~/components/Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorMessage from '~/components/ErrorMessage';
import Pagination from '~/components/Pagination';
import { MdOutlineEdit } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const schema = yup.object({
    name: yup.string().required('Tên gói tập không được để trống'),
    price: yup
        .number('Giá gói tập phải là số')
        .required('Giá gói tập không được để trống')
        .typeError('Giá gói tập phải là số')
        .moreThan(0, 'Giá gói tập phải lớn hơn 0'),
    duration: yup
        .number('Số buổi tập phải là số')
        .required('Số buổi tập không được để trống')
        .typeError('Số buổi tập phải là số')
        .moreThan(0, 'Số buổi tập phải lớn hơn 0'),
});

const MyCourse = () => {
    const { trainingCourses, pageSize, totalCount } = useSelector((state) => state.coach);
    const dispatch = useDispatch();
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState({});
    const [nameEdit, setNameEdit] = useState('');
    const [nameEditError, setNameEditError] = useState(null);
    const [priceEdit, setPriceEdit] = useState('');
    const [priceEditError, setPriceEditError] = useState(null);
    const [durationEdit, setDurationEdit] = useState('');
    const [durationEditError, setDurationEditError] = useState(null);
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const handleCloseAndResetAddForm = () => {
        setIsAdd(false);
        reset({ name: '', price: '', duration: '', description: '' });
    };

    const handleAddCourse = (data) => {
        try {
            dispatch(
                addTrainingCourseAsync({
                    name: data.name,
                    price: data.price,
                    duration: data.duration,
                    description: data.description,
                }),
            );
            handleCloseAndResetAddForm();
        } catch (error) {
            console.log(error);
        }
    };

    const formatMoneyEditString = (moneyString) => {
        moneyString = moneyString.replace(/,/g, '').replace(/ VNĐ/g, '');
        if (moneyString.endsWith(' VNĐ')) {
            moneyString = moneyString.slice(0, -4);
        }
        return moneyString;
    };

    const handleOpenEditModal = (course) => {
        setIsEdit(true);
        setSelectedCourse(course);
        setNameEdit(course.name);
        setPriceEdit(formatMoneyEditString(course.price.trim()));
        setDurationEdit(course.duration);
        setDescriptionEdit(course.description);
    };

    //Check numeric of str
    const isNumeric = (str) => {
        return /^\d+$/.test(str);
    };

    const handleEditCourse = (e) => {
        e.preventDefault();
        if (nameEdit === '' && priceEdit === '' && durationEdit === '') {
            setNameEditError('Tên gói tập không được để trống');
            setPriceEditError('Giá gói tập không được để trống');
            setDurationEditError('Số buổi tập không được để trống');
        } else if (parseFloat(priceEdit) <= 0 && parseFloat(durationEdit) <= 0) {
            setPriceEditError('Giá gói tập phải lớn hơn 0');
            setDurationEditError('Số buổi tập phải lớn hơn 0');
        } else if (!isNumeric(priceEdit) && !isNumeric(durationEdit)) {
            setPriceEditError('Giá gói tập phải là số');
            setDurationEditError('Số buổi tập phải là số');
        } else if (!isNumeric(priceEdit)) {
            setPriceEditError('Giá gói tập phải là số');
        } else if (!isNumeric(durationEdit)) {
            setDurationEditError('Số buổi tập phải là số');
        } else {
            dispatch(
                editTrainingCourseAsync({
                    id: selectedCourse.id,
                    name: nameEdit,
                    price: priceEdit,
                    duration: durationEdit,
                    description: descriptionEdit,
                }),
            );
            handleCloseEditModal();
        }
    };

    const handleCloseEditModal = () => {
        setIsEdit(false);
        setNameEditError(null);
        setPriceEditError(null);
        setDurationEditError(null);
    };

    const handleOpenDeleteModal = (course) => {
        setIsDelete(true);
        setSelectedCourse(course);
    };

    const handleDeleteCourse = (courseId) => {
        dispatch(deleteTrainingCourseAsync(courseId));
        setIsDelete(false);
    };

    return (
        <div className={cx('wrapper')}>
            {trainingCourses && trainingCourses.length > 0 ? (
                <>
                    <div className={cx('action')}>
                        <div className={cx('add')}>
                            <button id={cx('add-btn')} onClick={() => setIsAdd(true)}>
                                <AiOutlinePlus className={cx('icon')} />
                                <span>Thêm gói tập</span>
                            </button>
                        </div>
                        <div className={cx('filter-and-search')}>
                            <input type="text" placeholder="Tìm kiếm" />
                        </div>
                    </div>
                    <div className={cx('course-list')}>
                        {trainingCourses.map((course) => (
                            <div className={cx('course-item')} key={course.id}>
                                <TrainingCourseCard course={course} />
                                <div className={cx('item-action')}>
                                    <button id={cx('edit-btn')} onClick={() => handleOpenEditModal(course)}>
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
                    <h1>Hiện chưa có gói tập nào</h1>
                    <button id={cx('add-btn')} onClick={() => setIsAdd(true)} style={{ margin: 'auto' }}>
                        <AiOutlinePlus className={cx('icon')} />
                        <span>Thêm gói tập</span>
                    </button>
                </div>
            )}
            {isAdd && (
                <Modal
                    id={cx('add-modal')}
                    show={isAdd}
                    onClose={handleCloseAndResetAddForm}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Thông tin gói tập</h2>
                        <form id={cx('add-form')} onSubmit={handleSubmit(handleAddCourse)}>
                            <div className={cx('input-group')}>
                                <label htmlFor="name">Tên gói tập</label>
                                <input type="text" {...register('name')} />
                            </div>
                            {errors.name && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={errors.name.message} />
                                </div>
                            )}
                            <div className={cx('input-group')}>
                                <label htmlFor="price">Giá</label>
                                <input type="text" {...register('price')} />
                            </div>
                            {errors.price && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={errors.price.message} />
                                </div>
                            )}
                            <div className={cx('input-group')}>
                                <label htmlFor="duration">Số buổi</label>
                                <input type="text" {...register('duration')} />
                            </div>
                            {errors.duration && (
                                <div className={cx('error')}>
                                    <ErrorMessage message={errors.duration.message} />
                                </div>
                            )}
                            <div className={cx('input-group', 'description')}>
                                <label htmlFor="description">Mô tả</label>
                                <textarea {...register('description')}></textarea>
                            </div>
                            <div className={cx('modal-action')}>
                                <button id={cx('agree-btn')} type="submit">
                                    <BsCheckLg />
                                    <span>Thêm mới</span>
                                </button>
                                <button id={cx('cancel-btn')} onClick={handleCloseAndResetAddForm}>
                                    <BsXLg />
                                    <span>Hủy bỏ</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}

            {isEdit && (
                <Modal
                    id={cx('edit-modal')}
                    show={isEdit}
                    onClose={handleCloseEditModal}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Thông tin gói tập</h2>
                        <form id={cx('edit-form')} onSubmit={handleEditCourse}>
                            <div className={cx('input-group')}>
                                <label htmlFor="name">Tên gói tập</label>
                                <input
                                    id="name-edit"
                                    type="text"
                                    value={nameEdit}
                                    onChange={(e) => setNameEdit(e.target.value)}
                                />
                            </div>
                            {nameEditError && (
                                <div className={cx('error')}>
                                    {' '}
                                    <ErrorMessage message={nameEditError} />
                                </div>
                            )}
                            <div className={cx('input-group', 'price-edit')}>
                                <label htmlFor="price">Giá</label>
                                <input
                                    id="price-edit"
                                    type="text"
                                    value={priceEdit}
                                    onChange={(e) => setPriceEdit(e.target.value)}
                                />
                                <span className={cx('unit')}>VNĐ</span>
                            </div>
                            {priceEditError && (
                                <div className={cx('error')}>
                                    {' '}
                                    <ErrorMessage message={priceEditError} />
                                </div>
                            )}
                            <div className={cx('input-group')}>
                                <label htmlFor="duration">Số buổi</label>
                                <input
                                    type="text"
                                    value={durationEdit}
                                    onChange={(e) => setDurationEdit(e.target.value)}
                                />
                            </div>
                            {durationEditError && (
                                <div className={cx('error')}>
                                    {' '}
                                    <ErrorMessage message={durationEditError} />
                                </div>
                            )}
                            <div className={cx('input-group', 'description')}>
                                <label htmlFor="description">Mô tả</label>
                                <textarea
                                    id="description-edit"
                                    type="text"
                                    value={descriptionEdit}
                                    onChange={(e) => setDescriptionEdit(e.target.value)}
                                />
                            </div>
                            <div className={cx('modal-action')}>
                                <button id={cx('agree-btn')} type="submit">
                                    <BsCheckLg />
                                    <span>Lưu</span>
                                </button>
                                <button id={cx('cancel-btn')} onClick={handleCloseEditModal}>
                                    <BsXLg />
                                    <span>Hủy bỏ</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
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

import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainingCourseCard from "~/components/TrainingCourseCard";
import { addTrainingCourseAsync, getTrainingCourseAsync, setPage } from "~/features/coachSlice";
import {AiOutlinePlus } from 'react-icons/ai';
import { BsCheckLg, BsXLg} from 'react-icons/bs';
import styles from './MyCourse.module.scss';
import Modal from "~/components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorMessage from "~/components/ErrorMessage";
import Pagination from "~/components/Pagination";

const cx = classNames.bind(styles);

const schema = yup.object({
    name: yup.string().required('Tên gói tập không được để trống'),
    price: yup.number('Giá gói tập phải là số').typeError('Giá gói tập phải là số').required('Giá gói tập không được để trống'),
    duration: yup.number('Số buổi tập phải là số').typeError('Số buổi tập phải là số').required('Số buổi tập không được để trống'),
});

const MyCourse = () => {
    const [isAdd, setIsAdd] = useState(false);
    const {trainingCourses, pageIndex, pageSize, totalCount} = useSelector(state => state.coach);
    const dispatch = useDispatch();

    console.log(trainingCourses);


    useEffect(() => {
        dispatch(getTrainingCourseAsync({pageIndex: pageIndex, pageSize: 20}))
    }, [dispatch, pageIndex]);

    //Pagination
    const [pageChange, setPageChange] = useState(pageIndex);

    const handlePageChange = (pageNumber) => {
        setPageChange(pageNumber);
        dispatch(setPage(pageNumber));
        dispatch(getTrainingCourseAsync({ pageIndex: pageNumber, pageSize }));
    };

    const currentTrainingCoursesPagination = useMemo(() => {
        return trainingCourses;
    }, [trainingCourses]);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const handleCloseAndResetAddForm = () => {
        setIsAdd(false);
        reset({ name: '', price: '', duration: '', description: '' });
    }

    const handleAddCourse = (data) => {
        try {
            dispatch(addTrainingCourseAsync({
                name: data.name,
                price: data.price,
                duration: data.duration,
                description: data.description,
            }));
            handleCloseAndResetAddForm();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={cx('wrapper')}>
            {
                trainingCourses && trainingCourses.length > 0 ? (
                    <>
                        <div className={cx('action')}>
                            <div className={cx('add')}>
                                <button id={cx('add-btn')} onClick={() => setIsAdd(true)}>
                                    <AiOutlinePlus className={cx('icon')}/>
                                    <span>Thêm gói tập</span>
                                </button>
                            </div>
                            <div className={cx('filter-and-search')}>
                                <input type="text" placeholder="Tìm kiếm"/>
                            </div>
                        </div>
                        <div className={cx('course-list')}>
                            {currentTrainingCoursesPagination.map(course => 
                                <div className={cx('course-item')} key={course.id}>
                                    <TrainingCourseCard course={course}/>
                                </div>
                            )}
                            <Pagination
                                className={cx('pagination-bar')}
                                currentPage={pageChange}
                                totalCount={totalCount}
                                pageSize={pageSize}
                                onPageChange={(pageChange) => handlePageChange(pageChange)}
                            /> 
                        </div>
                    </>
                ): (
                    <div className={cx('course-empty')}>
                        <h1>Hiện chưa có gói tập nào</h1>
                        <button id={cx('add-btn')} onClick={() => setIsAdd(true)} style={{margin: 'auto'}}>
                            <AiOutlinePlus className={cx('icon')}/>
                            <span>Thêm gói tập</span>
                        </button>
                    </div>
                )
            }
            {isAdd && <Modal 
            id={cx('add-modal')} 
            show={isAdd}  
            onClose={handleCloseAndResetAddForm} 
            modalStyle={{}} 
            closeBtnStyle={{ display: 'none' }}>
                <div className={cx('header')}>
                    <h1>iCoaching</h1>
                </div>
                <div className={cx('body')}>
                    <h2 className={cx('title')}>Thông tin gói tập</h2>
                    <form id={cx('add-form')} onSubmit={handleSubmit(handleAddCourse)} autoComplete='off'>
                        <div className={cx('input-group')}>
                            <label htmlFor="name">Tên gói tập</label>
                            <input type="text" {...register('name')}/>
                        </div>
                        {errors.name && <div className={cx('error')}><ErrorMessage message={errors.name.message} /></div>}
                        <div className={cx('input-group')}>
                            <label htmlFor="price">Giá</label>
                            <input type="text" {...register('price')}/>
                        </div>
                        {errors.price && <div className={cx('error')}><ErrorMessage message={errors.price.message} /></div>}
                        <div className={cx('input-group')}>
                            <label htmlFor="duration">Số buổi</label>
                            <input type="text" {...register('duration')}/>
                        </div>
                        {errors.duration && <div className={cx('error')}><ErrorMessage message={errors.duration.message} /></div> }
                        <div className={cx('input-group', 'description')}>
                            <label htmlFor="description">Mô tả</label>
                            <textarea {...register('description')}></textarea>
                        </div>
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type='submit'>
                                <BsCheckLg/>
                                <span>Thêm mới</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={handleCloseAndResetAddForm}>
                                <BsXLg/>
                                <span>Hủy bỏ</span>
                            </button>
                        </div>
                    </form>
                </div>
                </Modal>}
        </div>
    );
};

export default MyCourse;

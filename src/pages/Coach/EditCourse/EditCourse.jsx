import classNames from 'classnames/bind';
import styles from './EditCourse.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import ReactQuill from 'react-quill';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ErrorMessage from '~/components/ErrorMessage';
import { editTrainingCourseAsync, getTrainingCourseByIdAsync } from '~/features/coachSlice';

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
};

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
];

const schema = yup.object({
    name: yup.string().required('Tên gói tập không được để trống'),
    price: yup
        .number()
        .required('Giá không được để trống')
        .positive('Giá gói tập phải lớn hơn 0')
        .integer('Giá gói tập phải là số nguyên dương'),
    duration: yup
        .number()
        .required('Số buổi không được để trống')
        .positive('Số buổi tập phải lớn hơn 0')
        .integer('Số buổi tập phải là số nguyên dương'),
});

const cx = classNames.bind(styles);

const EditCourse = () => {
    const { id, courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        dispatch(getTrainingCourseByIdAsync(courseId))
            .unwrap()
            .then((response) => {
                setValue('name', response.name);
                setValue('duration', response.duration);
                setValue('price', response.price);
                setValue('description', response.description);
            });
    }, [dispatch, courseId, setValue]);

    const handleEditCourse = (data) => {
        try {
            dispatch(
                editTrainingCourseAsync({
                    id: courseId,
                    name: data.name,
                    price: data.price,
                    duration: data.duration,
                    description: data.description,
                }),
            );
            navigate(`/coach/${id}/my-courses`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <Link to={`/coach/${id}/my-courses`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </Link>
                <h2 className={cx('title')}>Thông tin gói tập</h2>
            </div>
            <div className={cx('content')}>
                <form id={cx('edit-form')} onSubmit={handleSubmit(handleEditCourse)}>
                    <div className={cx('input-group')}>
                        <label htmlFor="name">Tên gói tập</label>
                        <input type="text" {...register('name')} />
                    </div>
                    {errors.name && (
                        <div className={cx('error')}>
                            <ErrorMessage message={errors.name.message} />
                        </div>
                    )}
                    <div className={cx('input-group', cx('price'))}>
                        <label htmlFor="price">Giá</label>
                        <input type="text" {...register('price')} />
                        <span className={cx('unit')}>VNĐ</span>
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
                        <Controller
                            name="description"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <ReactQuill
                                    value={value}
                                    onChange={onChange}
                                    modules={modules}
                                    formats={formats}
                                    bounds={'.app'}
                                    className={cx('editor')}
                                    placeholder="Mô tả gì đó về gói tập..."
                                />
                            )}
                        />
                    </div>
                    <button id={cx('agree-btn')} type="submit">
                        <span>Cập nhật</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCourse;

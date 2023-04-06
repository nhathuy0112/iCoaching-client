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
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';

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
        .required('Giá gói tập không được để trống')
        .min(10000, 'Giá gói tập phải từ 10,000 VNĐ trở lên')
        .transform((value, originalValue) => {
            const intValue = parseInt(originalValue.replaceAll(',', ''));
            return isNaN(intValue) ? undefined : intValue;
        })
        .typeError('Giá gói tập phải là một số'),
    duration: yup
        .string()
        .required('Số buổi tập không được để trống')
        .test('greaterThanZero', 'Số buổi tập phải lớn hơn 0', (value) => {
            if (value && parseInt(value) <= 0) {
                return false;
            }
            return true;
        })
        .test('durationFormat', 'Số buổi tập phải là số và không gồm kí tự đặc biệt', (value) => {
            if (value && !/^\d+$/.test(value)) {
                return false;
            }
            return true;
        }),
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
            toast.success('Chỉnh sửa gói tập thành công!');
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
                        <label className={cx('input-label')} htmlFor="name">
                            Tên gói tập
                        </label>
                        <input type="text" {...register('name')} />
                    </div>
                    {errors.name && (
                        <div className={cx('error')}>
                            <ErrorMessage message={errors.name.message} />
                        </div>
                    )}
                    <div className={cx('input-group', cx('price'))}>
                        <label className={cx('input-label')} htmlFor="price">
                            Giá
                        </label>
                        <Controller
                            name="price"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <NumericFormat
                                    value={value}
                                    onChange={onChange}
                                    allowLeadingZeros
                                    thousandSeparator=","
                                />
                            )}
                        />
                        <span className={cx('unit')}>VNĐ</span>
                    </div>
                    {errors.price && (
                        <div className={cx('error')}>
                            <ErrorMessage message={errors.price.message} />
                        </div>
                    )}
                    <div className={cx('input-group')}>
                        <label className={cx('input-label')} htmlFor="duration">
                            Số buổi
                        </label>
                        <input type="text" {...register('duration')} />
                    </div>
                    {errors.duration && (
                        <div className={cx('error')}>
                            <ErrorMessage message={errors.duration.message} />
                        </div>
                    )}
                    <div className={cx('input-group', 'description')}>
                        <label className={cx('input-label')} htmlFor="description">
                            Mô tả
                        </label>
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

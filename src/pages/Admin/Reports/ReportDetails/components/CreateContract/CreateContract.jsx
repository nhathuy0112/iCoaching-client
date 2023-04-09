import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './CreateContract.module.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import useDebounce from '~/hooks/useDebounce';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineCheck, AiOutlineSearch } from 'react-icons/ai';
import { createContractAsync, getAllCoachesAsync } from '~/features/adminSlice';
import { getCoachTrainingCourseAsync } from '~/features/guestSlice';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorMessage from '~/components/ErrorMessage';
import Spinner from '~/components/Spinner';
import { handleRenderGenders } from '~/utils/gender';
import { getContractDetailsAsync } from '~/features/contractSlice';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

const schema = yup.object({
    reason: yup.string().required('Lý do không được để trống'),
    coachId: yup.string().required('Huấn luyện viên không được để trống'),
    courseId: yup.string().required('Khóa tập phải được chọn'),
    description: yup.string().required('Mô tả không được để trống'),
});

const CreateContract = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const { trainingCourses, coaches } = useSelector((state) => state.guest);
    const { currentContract, loading } = useSelector((state) => state.contract);

    const { id, contractId, reportId } = useParams();
    const { client } = currentContract;

    const [search, setSearch] = useState('');

    const [initialCourse, setInitialCourse] = useState(false);
    const [showResult, setShowResult] = useState(true);
    const debounced = useDebounce(search, 500);

    useEffect(() => {
        dispatch(getContractDetailsAsync(contractId));
    }, [dispatch, contractId]);

    useEffect(() => {
        if (!debounced.trim()) {
            setInitialCourse(false);
            return;
        }
        dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: 20, search: encodeURIComponent(debounced) }));
    }, [dispatch, debounced]);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleCreateContract = (data) => {
        try {
            dispatch(
                createContractAsync({
                    reportId: reportId,
                    contract: {
                        coachId: data.coachId,
                        courseId: data.courseId,
                        description: data.description,
                        cancelReason: data.reason,
                    },
                }),
            )
                .unwrap()
                .then(() => {
                    navigate(`/admin/${id}/reports `);
                    toast.success('Tạo hợp đồng thành công');
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChooseCoach = (coach) => {
        setSearch(`${coach.userName} - ${coach.fullname}`);
        dispatch(getCoachTrainingCourseAsync({ coachId: coach.id }));
        setValue('courseId', '');
        setInitialCourse(true);
        setValue('coachId', coach.id);
    };

    const handleCoachChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            clearErrors('coachId');
        } else {
            setError('coachId', { type: 'custom', message: 'Huấn luyện viên không được để trống' });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <Link
                        to={`/admin/${currentUser?.Id}/reports/${contractId}/view-details/${reportId}`}
                        className={cx('back-link')}
                    >
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <form onSubmit={handleSubmit(handleCreateContract)} className={cx('contract')}>
                    <div className={cx('client')}>
                        <label>Khách hàng:</label>
                        <span>{client?.fullname}</span>
                        <label>Giới tính:</label>
                        <span>{handleRenderGenders(client?.gender)}</span>
                        <label>Tuổi:</label>
                        <span>{client?.age}</span>
                    </div>
                    <div className={cx('cancel')}>
                        <label>Lý do huỷ hợp đồng cũ:</label>
                        <textarea name="reason" id="" {...register('reason')}></textarea>
                    </div>
                    {errors.reason && (
                        <div className={cx('error')}>
                            <ErrorMessage message={errors.reason.message} />
                        </div>
                    )}
                    <hr />
                    <div className={cx('coach')}>
                        <h2 className={cx('title')}>Hợp đồng mới</h2>
                        <label>Huấn luyện viên</label>
                        <Tippy
                            className={cx('drop-search')}
                            placement="bottom-start"
                            arrow={false}
                            interactive={true}
                            visible={showResult && search !== '' && coaches.length > 0}
                            content={
                                <div className={cx('wrapper')} tabIndex="-1">
                                    {coaches.map((coach) => (
                                        <div
                                            key={coach.id}
                                            className={cx('item')}
                                            onClick={() => handleChooseCoach(coach)}
                                        >
                                            {coach.userName} - {coach.fullname}
                                        </div>
                                    ))}
                                </div>
                            }
                            onClickOutside={handleHideResult}
                        >
                            <div className={cx('coach-search')}>
                                <input
                                    type="text"
                                    name="coach"
                                    id={cx('coach-name')}
                                    {...register('coachId')}
                                    value={search}
                                    onFocus={() => setShowResult(true)}
                                    onChange={handleCoachChange}
                                />

                                <div className={cx('icon')}>
                                    <AiOutlineSearch />
                                </div>
                            </div>
                        </Tippy>
                        {errors.coachId && (
                            <div className={cx('error')}>
                                <ErrorMessage message={errors.coachId.message} />
                            </div>
                        )}
                        <label>Khoá tập</label>
                        <select defaultValue="" {...register('courseId')}>
                            <option value="" disabled>
                                {'--Chọn huấn luyện viên để lấy gói tập--'}
                            </option>
                            {initialCourse &&
                                trainingCourses?.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}: {course.duration} buổi - {course.price}
                                    </option>
                                ))}
                        </select>
                        {errors.courseId && (
                            <div className={cx('error')}>
                                <ErrorMessage message={errors.courseId.message} />
                            </div>
                        )}
                        <label>Mô tả hợp đồng</label>
                        <textarea name="desc" id="" {...register('description')}></textarea>
                        {errors.description && (
                            <div className={cx('error')}>
                                <ErrorMessage message={errors.description.message} />
                            </div>
                        )}
                    </div>
                    <button type="submit">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                <AiOutlineCheck className={cx('icon')} />
                                Tạo hợp đồng
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateContract;

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
import { AiOutlineCheck } from 'react-icons/ai';
import { createContractAsync, getAllCoachesAsync } from '~/features/adminSlice';
import { getCoachTrainingCourseAsync } from '~/features/guestSlice';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorMessage from '~/components/ErrorMessage';
const cx = classNames.bind(styles);

// const schema = yup.object({
//     reason: yup.string().required('Lý do không được để trống'),
//     coachId: yup.string().required('Huấn luyện viên không được để trống'),
//     trainingCourse: yup.string().required('Khoá tập phải được chọn'),
//     description: yup.string().required('Mô tả không được để trống'),
// });

const CreateContract = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const { trainingCourses } = useSelector((state) => state.guest);
    const { currentContract } = useSelector((state) => state.contract);
    const { coaches } = useSelector((state) => state.admin);

    const { id, contractId, reportId } = useParams();
    const { client } = currentContract;

    const [search, setSearch] = useState('');
    const [coachId, setCoachId] = useState('');

    const [initialCourse, setInitialCourse] = useState(false);
    const [showResult, setShowResult] = useState(true);
    const debounced = useDebounce(search, 500);

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
        formState: { errors },
    } = useForm();
    // { resolver: yupResolver(schema)

    const handleContract = (data) => {
        try {
            dispatch(
                createContractAsync({
                    reportId: reportId,
                    contract: {
                        coachId: coachId,
                        courseId: data.courseId,
                        description: data.description,
                        cancelReason: data.reason,
                    },
                }),
            )
                .unwrap()
                .then(() => {
                    navigate(`/admin/${id}/reports `);
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
        setCoachId(coach.id);
        dispatch(getCoachTrainingCourseAsync({ coachId: coach.id }));
        setValue('courseId', 0);
        setInitialCourse(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <Link
                        to={`/admin/${currentUser?.Id}/reports/${contractId}/${reportId}`}
                        className={cx('back-link')}
                    >
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <form onSubmit={handleSubmit(handleContract)} className={cx('contract')}>
                    <div className={cx('client')}>
                        <label>Khách hàng:</label>
                        <span>{client?.fullname}</span>
                        <label>Giới tính:</label>
                        <span>{client?.gender}</span>
                        <label>Tuổi:</label>
                        <span>{client?.age}</span>
                    </div>
                    <div className={cx('cancel')}>
                        <label>Lý do huỷ hợp đồng cũ:</label>
                        <textarea name="reason" id="" cols="30" rows="3" {...register('reason')}></textarea>
                    </div>
                    <hr />
                    <div className={cx('coach')}>
                        <h2 className={cx('title')}>Hợp đồng mới</h2>
                        <label>Huấn luyện viên</label>
                        <Tippy
                            className={cx('drop-search')}
                            placement="bottom"
                            arrow={false}
                            interactive={true}
                            visible={showResult && search !== '' && coaches.length > 0}
                            content={
                                <div className={cx('wrapper')} tabIndex="-1">
                                    {coaches.map((coach) => (
                                        <div className={cx('item')} onClick={() => handleChooseCoach(coach)}>
                                            {coach.userName} - {coach.fullname}
                                        </div>
                                    ))}
                                </div>
                            }
                            onClickOutside={handleHideResult}
                        >
                            <input
                                type="text"
                                name="coach"
                                id=""
                                {...register('coachId')}
                                value={search}
                                onFocus={() => setShowResult(true)}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Tippy>
                        <label>Khoá tập</label>
                        <select defaultValue="0" {...register('courseId')}>
                            <option value="0" disabled>
                                {'--Chọn huấn luyện viên để lấy gói tập--'}
                            </option>
                            {initialCourse &&
                                trainingCourses?.map((course) => (
                                    <option value={course.id}>
                                        {course.id}: {course.name}
                                    </option>
                                ))}
                        </select>
                        <label>Mô tả hợp đồng</label>
                        <textarea name="desc" id="" cols="30" rows="10" {...register('description')}></textarea>
                    </div>
                    <button type="submit">
                        <AiOutlineCheck className={cx('icon')} />
                        Tạo hợp đồng
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateContract;

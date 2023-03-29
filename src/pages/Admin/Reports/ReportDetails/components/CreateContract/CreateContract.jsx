import classNames from 'classnames/bind';
import React from 'react';
import styles from './CreateContract.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createContractAsync } from '~/features/adminSlice';
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
    const { currentUser } = useSelector((state) => state.user);
    const { currentContract } = useSelector((state) => state.contract);
    const { contractId, reportId } = useParams();
    const { client } = currentContract;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // { resolver: yupResolver(schema) }

    const handleContract = (data) => {
        try {
            // console.log(data);
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
            );
        } catch (error) {
            console.log(error);
        }
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
                        {/* {errors.reason && <ErrorMessage message={errors.reason.message} />} */}
                    </div>
                    <hr />
                    <div className={cx('coach')}>
                        <h2 className={cx('title')}>Hợp đồng mới</h2>
                        <label>Huấn luyện viên</label>
                        <input type="text" name="coach" id="" {...register('coachId')} />
                        <label>Khoá tập</label>
                        <input type="text" name="course" id="" {...register('courseId')} />
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

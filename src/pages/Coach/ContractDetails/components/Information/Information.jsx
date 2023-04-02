import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorMessage from '~/components/ErrorMessage';
import { completedContractAsync } from '~/features/coachSlice';
import { getContractDetailsAsync } from '~/features/contractSlice';
import { handleRenderGenders } from '~/utils/gender';
import styles from './Information.module.scss';

const cx = classNames.bind(styles);

const Information = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.coach);
    const { currentContract } = useSelector((state) => state.contract);
    const { id, contractId } = useParams();

    useEffect(() => {
        dispatch(getContractDetailsAsync(contractId));
    }, [dispatch, contractId]);

    const handleCompletedContract = () => {
        dispatch(completedContractAsync(contractId))
            .unwrap()
            .then(() => {
                toast.success('Hoàn thành hợp đồng thành công!');
                navigate(`/coach/${id}/my-clients`, { state: { isPendingClient: true } });
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('contract-info')}>
                    <div className={cx('row-info')}>
                        <div className={cx('group-info', 'first-column')}>
                            <label htmlFor="">Khách hàng</label>
                            <span>{currentContract?.client?.fullname}</span>
                        </div>
                        <div className={cx('group-info', 'second-column')}>
                            <label htmlFor="">Giới tính</label>
                            <span>{handleRenderGenders(currentContract?.client?.gender)}</span>
                        </div>
                        <div className={cx('group-info', 'third-column')}>
                            <label htmlFor="">Tuổi</label>
                            <span>{currentContract?.client?.age}</span>
                        </div>
                        <div className={cx('group-info', 'fourth-column')}>
                            <label htmlFor="">Email</label>
                            <span>{currentContract?.client?.email}</span>
                        </div>
                        <div className={cx('group-info', 'fifth-column')}>
                            <label htmlFor="">SĐT</label>
                            <span>{currentContract?.client?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className={cx('row-info')}>
                        <div className={cx('group-info', 'first-column')}>
                            <label htmlFor="">Huấn luyện viên</label>
                            <span>{currentContract?.coach?.fullname}</span>
                        </div>
                        <div className={cx('group-info', 'second-column')}>
                            <label htmlFor="">Giới tính</label>
                            <span>{handleRenderGenders(currentContract?.coach?.gender)}</span>
                        </div>
                        <div className={cx('group-info', 'third-column')}>
                            <label htmlFor="">Tuổi</label>
                            <span>{currentContract?.coach?.age}</span>
                        </div>
                        <div className={cx('group-info', 'fourth-column')}>
                            <label htmlFor="">Email</label>
                            <span>{currentContract?.coach?.email}</span>
                        </div>
                        <div className={cx('group-info', 'fifth-column')}>
                            <label htmlFor="">SĐT</label>
                            <span>{currentContract?.coach?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className={cx('row-info')}>
                        <div className={cx('group-info', 'first-column')}>
                            <label htmlFor="">Gói tập</label>
                            <span>{currentContract?.courseName}</span>
                        </div>
                        <div className={cx('group-info', 'second-column')}>
                            <label htmlFor="">Số buổi</label>
                            <span>{currentContract?.duration}</span>
                        </div>
                        <div className={cx('group-info', 'third-column')}>
                            <label htmlFor="">Trạng thái</label>
                            <span>Đang tập</span>
                        </div>
                        <div className={cx('group-info', 'fourth-column')}>
                            <label htmlFor="">Giá</label>
                            <span>{currentContract?.price}</span>
                        </div>
                    </div>
                    <div className={cx('row-info')}>
                        <div className={cx('group-info', 'description')}>
                            <label htmlFor="">Mô tả</label>
                            <div dangerouslySetInnerHTML={{ __html: currentContract?.courseDescription }}></div>
                        </div>
                    </div>
                </div>
            </div>
            {!currentContract?.isComplete && (
                <div className={cx('error')}>
                    <ErrorMessage message={'Hợp đồng chưa hoàn thành hết tiến độ'} />
                </div>
            )}
            {currentContract?.isReported && (
                <div className={cx('error')}>
                    <ErrorMessage message={'Hợp đồng đang bị khiếu nại từ khách hàng'} />
                </div>
            )}
            {currentContract?.status === 'Active' && (
                <div
                    className={
                        !currentContract?.isComplete || currentContract?.isReported
                            ? cx('completed-btn', 'disabled')
                            : cx('completed-btn')
                    }
                    onClick={handleCompletedContract}
                >
                    <button>Hoàn thành</button>
                </div>
            )}
        </div>
    );
};

export default Information;

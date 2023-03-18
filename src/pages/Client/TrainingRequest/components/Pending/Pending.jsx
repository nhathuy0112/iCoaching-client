import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachingRequestsAsync } from '~/features/clientSlice';
import styles from './Pending.module.scss';

const cx = classNames.bind(styles);

const Pending = () => {
    const dispatch = useDispatch();
    const { coachingRequests } = useSelector((state) => state.client);

    useEffect(() => {
        dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 6, clientRequestStatus: 'Pending' }));
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            {coachingRequests && coachingRequests.length > 0 ? (
                <div className={cx('request-list')}>
                    {coachingRequests.map((request) => (
                        <div className={cx('request-item')} key={request.id}>
                            <div className={cx('card')}>
                                <div className={cx('card-content')}>
                                    <span className={cx('card-title', 'coach')}>Huấn luyện viên</span>
                                    <span>{request.coachName}</span>
                                </div>
                                <div className={cx('card-content')}>
                                    <span className={cx('card-title', 'course-name')}>Gói tập</span>
                                    <span>{request.courseName}</span>
                                </div>
                                <div className={cx('card-content')}>
                                    <span className={cx('card-title', 'duration')}>Số buổi</span>
                                    <span>{request.duration}</span>
                                </div>
                                <div className={cx('card-content')}>
                                    <span className={cx('card-title', 'price')}>Giá</span>
                                    <span>{request.price}</span>
                                </div>
                            </div>
                            <div className={cx('action')}>
                                <button id={cx('canceled-btn')}>Hủy</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('request-empty')}>
                    <h2>Hiện chưa có yêu cầu nào!</h2>
                </div>
            )}
        </div>
    );
};

export default Pending;

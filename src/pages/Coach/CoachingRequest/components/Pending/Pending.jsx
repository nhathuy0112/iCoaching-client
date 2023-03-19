import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachingRequestsAsync } from '~/features/coachSlice';
import { handleRenderGenders } from '~/utils/gender';
import styles from './Pending.module.scss';

const cx = classNames.bind(styles);

const Pending = () => {
    const dispatch = useDispatch();
    const { coachingRequests } = useSelector((state) => state.client);

    useEffect(() => {
        dispatch(getCoachingRequestsAsync({ pageIndex: 1, pageSize: 7, coachRequestStatus: 'Pending' }));
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            {coachingRequests && coachingRequests.length > 0 ? (
                <>
                    <form className={cx('search')}>
                        <div className={cx('search-box')} type="submit">
                            <AiOutlineSearch className={cx('search-icon')} />
                            <input type="text" placeholder="Tìm kiếm" />
                        </div>
                    </form>

                    <table id={cx('request-table')}>
                        <thead>
                            <tr className={cx('header-row')}>
                                <th>Khách hàng</th>
                                <th>Tuổi</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Gói tập</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coachingRequests.map((request) => (
                                <tr className={cx('content-row')} key={request.id}>
                                    <td className={cx('name')}>
                                        <div className={cx('avatar')}>
                                            <img
                                                src={require('../../../../../assets/images/coach-avatar.png')}
                                                alt=""
                                            />
                                        </div>
                                        <span>{request.clientName}</span>
                                    </td>
                                    <td>{request.age}</td>
                                    <td>{handleRenderGenders(request.gender)}</td>
                                    <td>{request.email}</td>
                                    <td>{request.phoneNumber}</td>
                                    <td>{request.courseName}</td>
                                    <td className={cx('action-btn')}>
                                        <button id={cx('btn-accept')}>Đồng ý</button>
                                        <button id={cx('btn-refuse')}>Từ chối</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className={cx('request-empty')}>
                    <h2>Hiện chưa có yêu cầu nào!</h2>
                </div>
            )}
        </div>
    );
};

export default Pending;

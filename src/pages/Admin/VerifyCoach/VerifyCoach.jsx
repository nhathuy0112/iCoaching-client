import classNames from 'classnames/bind';
import styles from './VerifyCoach.module.scss';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '~/components/Pagination';
import { getAllCertRequestsAsync } from '~/features/adminSlice';

import { handleRenderGenders } from '~/utils/gender';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const VerifyCoach = () => {
    const dispatch = useDispatch();
    const { coaches, totalCount, pageSize } = useSelector((state) => state.admin);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getAllCertRequestsAsync({ pageIndex: currentPage }));
    }, [dispatch, currentPage]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {coaches.length > 0 ? (
                    <form className={cx('search')}>
                        <div className={cx('search-box')} type="submit">
                            <AiOutlineSearch className={cx('search-icon')} />
                            <input type="text" placeholder="Tìm kiếm" />
                        </div>
                    </form>
                ) : (
                    ''
                )}

                {coaches.length > 0 ? (
                    <table className={cx('tb-coaches')}>
                        <thead>
                            <tr>
                                <th>Tên đăng nhập</th>
                                <th>Họ và tên</th>
                                <th>Giới tính</th>
                                <th>Tuổi</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {coaches.map((coach) => (
                                <tr key={coach.id}>
                                    <td>{coach.username}</td>
                                    <td>{coach.fullname}</td>
                                    <td>{handleRenderGenders(coach.gender)}</td>
                                    <td>{coach.age}</td>
                                    <td>{coach.email}</td>
                                    <td>{coach.phoneNumber}</td>
                                    <td>
                                        <Link to={`${coach.certId}`}>
                                            <button className={cx('btn-info')}>
                                                Xem chi tiết <MdOutlineKeyboardArrowRight className={cx('icon')} />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className={cx('message')}>
                        <h1>Hiện chưa có yêu cầu xác minh nào!</h1>
                    </div>
                )}
                <Pagination
                    className={cx('pagination-bar')}
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default VerifyCoach;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './CoachesView.module.scss';

import { BsCheckLg } from 'react-icons/bs';
import { BsXLg } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';

import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';
import { getAllCoachesAsync, updateStatusAsync, setStatus } from '~/features/adminSlice';
import { handleRenderGenders } from '~/utils/gender';

const cx = classNames.bind(styles);

const CoachesView = () => {
    const dispatch = useDispatch();
    const { coaches, totalCount, pageSize, pageIndex, isLocked } = useSelector((state) => state.admin);
    const [currentPage, setCurrentPage] = useState(pageIndex);

    useEffect(() => {
        dispatch(getAllCoachesAsync({ pageIndex: currentPage }));
    }, [dispatch, currentPage, isLocked]);

    const [lockOpen, setLockOpen] = useState(false);
    const [coachAccount, setCoachAccount] = useState();

    const handleLockOpen = (coach) => {
        setLockOpen(true);
        setCoachAccount(coach);
    };

    const handleUpdateStatus = (id) => {
        dispatch(updateStatusAsync(id));
        dispatch(setStatus(id));
        setLockOpen(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2>Danh sách kiểm duyệt viên</h2>
                <form className={cx('search')}>
                    <div className={cx('search-box')} type="submit">
                        <AiOutlineSearch className={cx('search-icon')} />
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Tên đăng nhập</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Tuổi</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {coaches.map((coach) => (
                            <tr className="">
                                <td>{coach.userName}</td>
                                <td>{coach.fullname}</td>
                                <td>{handleRenderGenders(coach.gender)}</td>
                                <td>{coach.age}</td>
                                <td>{coach.email}</td>
                                <td>{coach.phoneNumber}</td>
                                <td>
                                    <button
                                        className={cx(`${coach.isLocked === true ? 'btn-confirm' : 'btn-warn'}`)}
                                        onClick={() => handleLockOpen(coach)}
                                    >
                                        {coach.isLocked === true ? 'Mở khoá tài khoản' : 'Khoá tài khoản'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                className={cx('pagination-bar')}
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
            {lockOpen && (
                <Modal
                    show={lockOpen}
                    onClose={() => setLockOpen(false)}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('lock-modal')}>
                        <h1 className={cx('modal-header')}>iCoaching</h1>
                        <form action="">
                            <p>{`Bạn có đồng ý khoá tài khoản ${coachAccount.userName}?`}</p>
                            <div className={cx('button')}>
                                <button
                                    className={cx('btn-confirm')}
                                    onClick={() => handleUpdateStatus(coachAccount.id)}
                                >
                                    <BsCheckLg className={cx('icon')} />
                                    Đồng ý
                                </button>
                                <button className={cx('btn-warn')} onClick={() => setLockOpen(false)}>
                                    <BsXLg className={cx('icon')} /> Huỷ bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CoachesView;

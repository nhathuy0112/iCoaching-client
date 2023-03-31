import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './CoachesView.module.scss';

import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaLockOpen, FaLock } from 'react-icons/fa';
import { IoMdWarning } from 'react-icons/io';

import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';
import { getAllCoachesAsync, updateStatusAsync, warnCoachAsync } from '~/features/adminSlice';
import { handleRenderGenders } from '~/utils/gender';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const CoachesView = () => {
    const dispatch = useDispatch();
    const { coaches, totalCount, pageSize, status } = useSelector((state) => state.admin);
    const [currentPage, setCurrentPage] = useState(1);

    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/admin/${currentUser.Id}/all-coaches`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getAllCoachesAsync({ pageIndex: currentPage, pageSize: 6 }));
    }, [dispatch, currentPage, status]);

    const [lockOpen, setLockOpen] = useState(false);
    const [coachAccount, setCoachAccount] = useState();
    const [warnOpen, setWarnOpen] = useState(false);

    const handleLockOpen = (coach) => {
        setLockOpen(true);
        setCoachAccount(coach);
    };

    const handleUpdateStatus = (id) => {
        dispatch(updateStatusAsync(id));
        setLockOpen(false);
    };

    const handleWarnOpen = (coach) => {
        setWarnOpen(true);
        setCoachAccount(coach);
    };

    const handleWarnCoach = (id) => {
        dispatch(warnCoachAsync(id));
        setWarnOpen(false);
        setCurrentPage(1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <form className={cx('search')}>
                    <div className={cx('search-box')} type="submit">
                        <AiOutlineSearch className={cx('search-icon')} />
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                </form>

                <table className={cx('tb-coaches')}>
                    <thead>
                        <tr className={cx('header-row')}>
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
                            <tr className={cx('content-row')} key={coach.id}>
                                <td className={cx('name')}>
                                    <div className={cx('avatar')}>
                                        <img src={coach.avatarUrl} alt="" />
                                    </div>
                                    <span>{coach.userName}</span>
                                </td>
                                <td>{coach.fullname}</td>
                                <td>{handleRenderGenders(coach.gender)}</td>
                                <td>{coach.age}</td>
                                <td>{coach.email}</td>
                                <td>{coach.phoneNumber}</td>
                                <td className={cx('action-btn')}>
                                    <button id={cx('warning')} onClick={() => handleWarnOpen(coach)}>
                                        {coach.warningCount}
                                        <IoMdWarning className={cx('icon')} />
                                    </button>
                                    <button
                                        id={cx(`${coach.isLocked ? 'btn-confirm' : 'btn-warn'}`)}
                                        onClick={() => handleLockOpen(coach)}
                                    >
                                        {coach.isLocked ? <FaLockOpen /> : <FaLock />}
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

            {/* lock coach account */}
            {lockOpen && (
                <Modal
                    show={lockOpen}
                    onClose={() => setLockOpen(false)}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('header')}>iCoaching</h2>
                        <p>{`Bạn có đồng ý ${coachAccount.isLocked ? 'mở' : ''} khoá tài khoản ${
                            coachAccount.userName
                        }?`}</p>
                        <div className={cx('button')}>
                            <button className={cx('btn-confirm')} onClick={() => handleUpdateStatus(coachAccount.id)}>
                                <BsCheckLg className={cx('icon')} />
                                Đồng ý
                            </button>
                            <button className={cx('btn-warn')} onClick={() => setLockOpen(false)}>
                                <BsXLg className={cx('icon')} /> Huỷ bỏ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* warn coach */}
            {warnOpen && (
                <Modal
                    show={warnOpen}
                    onClose={() => setWarnOpen(false)}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('header')}>iCoaching</h2>
                        <p>{`Gửi cảnh báo tới huấn luyện viên ${coachAccount.userName}?`}</p>
                        <div className={cx('button')}>
                            <button className={cx('btn-confirm')} onClick={() => handleWarnCoach(coachAccount.id)}>
                                <BsCheckLg className={cx('icon')} />
                                Đồng ý
                            </button>
                            <button className={cx('btn-warn')} onClick={() => setWarnOpen(false)}>
                                <BsXLg className={cx('icon')} /> Huỷ bỏ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CoachesView;

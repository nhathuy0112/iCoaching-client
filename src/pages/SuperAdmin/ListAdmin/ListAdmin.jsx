import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ListAdmin.module.scss';

import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaLockOpen, FaLock } from 'react-icons/fa';

import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';
import { getAdminData, updateAdminStatus } from '~/features/superAdminSlice';
import { handleRenderGenders } from '~/utils/gender';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const ListAdmin = () => {
    const dispatch = useDispatch();
    const { data, count, pageSize, status } = useSelector((state) => state.superAdmin);
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/super_admin/${currentUser.Id}/list-admin`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getAdminData({ currentPage: currentPage, pageSize: 6 }));
    }, [dispatch, currentPage, status]);

    const [lockOpen, setLockOpen] = useState(false);
    const [adminAccount, setAdminAccount] = useState();

    const handleLockOpen = (admin) => {
        setLockOpen(true);
        setAdminAccount(admin);
    };

    const handleUpdateStatus = (id) => {
        dispatch(updateAdminStatus(id));
        setLockOpen(false);
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
                        {data?.map((admin) => (
                            <tr className={cx('content-row')} key={admin.id}>
                                <td className={cx('name')}>
                                    <div className={cx('avatar')}>
                                        <img src={admin.avatarUrl} alt="" />
                                    </div>
                                    <span>{admin.userName}</span>
                                </td>
                                <td>{admin.fullname}</td>
                                <td>{handleRenderGenders(admin.gender)}</td>
                                <td>{admin.age}</td>
                                <td>{admin.email}</td>
                                <td>{admin.phoneNumber}</td>
                                <td className={cx('action-btn')}>
                                    <button
                                        id={cx(`${admin.isLocked ? 'btn-confirm' : 'btn-warn'}`)}
                                        onClick={() => handleLockOpen(admin)}
                                    >
                                        {admin.isLocked ? <FaLockOpen /> : <FaLock />}
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
                totalCount={count}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />

            {/* lock admin account */}
            {lockOpen && (
                <Modal
                    show={lockOpen}
                    onClose={() => setLockOpen(false)}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('header')}>iCoaching</h2>
                        <p>{`Bạn có đồng ý ${adminAccount.isLocked ? 'mở' : ''} khoá tài khoản ${
                            adminAccount.userName
                        }?`}</p>
                        <div className={cx('button')}>
                            <button className={cx('btn-confirm')} onClick={() => handleUpdateStatus(adminAccount.id)}>
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
        </div>
    );
};

export default ListAdmin;

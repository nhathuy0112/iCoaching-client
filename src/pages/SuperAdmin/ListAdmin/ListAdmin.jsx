import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ListAdmin.module.scss';

import { BsCheckLg, BsXLg, BsFillInfoCircleFill } from 'react-icons/bs';
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
    const [isViewMessage, setIsViewMessage] = useState(false);
    const [note, setNote] = useState('');
    const [searchValue, setSearchValue] = useState('');

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

    const handleNoteOpen = (note) => {
        setIsViewMessage(true);
        setNote(note);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(getAdminData({ currentPage: currentPage, pageSize: 6 }));
        } else {
            dispatch(getAdminData({ currentPage: currentPage, pageSize: 6, search: searchValue }));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <form className={cx('search')} onSubmit={(e) => handleSearch(e)}>
                    <div className={cx('search-box')}>
                        <button type="submit">
                            <AiOutlineSearch className={cx('search-icon')} />
                        </button>
                        <input
                            type="text"
                            placeholder="Quản trị viên"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </form>
                {data && data.length > 0 ? (
                    <>
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
                                            {admin.note ? (
                                                <button id={cx('btn-info')} onClick={() => handleNoteOpen(admin.note)}>
                                                    <BsFillInfoCircleFill />
                                                </button>
                                            ) : (
                                                ''
                                            )}

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
                        <Pagination
                            className={cx('pagination-bar')}
                            currentPage={currentPage}
                            totalCount={count}
                            pageSize={pageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </>
                ) : (
                    <div className={cx('admin-empty')}>
                        <h2>Không tìm thấy Quản trị viên nào!</h2>
                    </div>
                )}
            </div>

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

            {/* view admin's note */}
            {isViewMessage && (
                <Modal
                    id={cx('view-message-modal')}
                    show={isViewMessage}
                    onClose={() => setIsViewMessage(false)}
                    modalStyle={{ width: '60%' }}
                    closeBtnStyle={{ color: 'var(--white-color)', cursor: 'pointer' }}
                >
                    <div className={cx('modal')}>
                        <div className={cx('header')}>
                            <h1>iCoaching</h1>
                        </div>
                        <div className={cx('body')}>
                            <textarea className={cx('note')} defaultValue={note} readOnly />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ListAdmin;

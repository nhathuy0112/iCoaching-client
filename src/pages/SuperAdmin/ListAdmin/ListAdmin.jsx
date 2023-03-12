import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './ListAdmin.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { HiOutlineXMark } from 'react-icons/hi2';
import { setPage, setSearch, setLock, updateAdminStatus, getAdminData } from '~/features/superAdminSlice';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

const ListAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const { data, currentPage, pageSize, search, isLocked, count } = useSelector((state) => state.superAdmin);
    const [page, setPageChanged] = useState(currentPage);
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (currentUser === null) navigate('/');
    }, [currentUser, navigate]);

    // useEffect(() => {
    //     const autoRefreshToken = async () => {
    //         if (currentUser) {
    //             let currentDate = new Date();
    //             let expTime = currentUser.exp;
    //             if (expTime * 1000 < currentDate.getTime()) {
    //                 dispatch(
    //                     refreshAsync({
    //                         accessToken: getLocalStorage('auth').accessToken,
    //                         refreshToken: getLocalStorage('auth').refreshToken,
    //                     }),
    //                 );
    //             }
    //         }
    //     };
    //     autoRefreshToken();
    // }, [dispatch, currentUser]);

    useEffect(() => {
        dispatch(
            getAdminData({
                currentPage,
                pageSize,
                search,
                count,
            }),
        );
    }, [dispatch, currentPage, pageSize, search, isLocked, count]);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(setSearch(searchValue));
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(setSearch(searchValue));
            setPageChanged(1);
        }, 200);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchValue, dispatch]);

    const LockedAdmin = (id) => {
        dispatch(updateAdminStatus(id));
        dispatch(setLock(id));
        setOpen(false);
    };

    const handleOpen = (item) => {
        setOpen(true);
        setId(item);
    };

    const currentAdminPagination = useMemo(() => {
        console.log(page);
        return data;
    }, [data, page]);

    const handlePageChanged = (pageNumber) => {
        setPageChanged(pageNumber);
        dispatch(setPage(pageNumber));
        dispatch(getAdminData({ currentPage: pageNumber, pageSize }));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('container_text')}>Danh sách kiểm duyệt viên</h2>
                <form className={cx('search')} onSubmit={handleSearchSubmit}>
                    <div className={cx('search_box')} type="submit">
                        <AiOutlineSearch className={cx('search_icon')} />
                        <input
                            className={cx('search_input')}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Tìm kiếm"
                        />
                    </div>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>SĐT</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAdminPagination?.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.userName}</td>
                                <td>{item.fullname}</td>
                                <td>{item.gender}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>
                                    <button
                                        className={cx({
                                            button_lock: !item.isLocked,
                                            button_active: item.isLocked,
                                        })}
                                        onClick={() => handleOpen(item.id)}
                                    >
                                        {item.isLocked ? 'Mở khoá tài khoản' : 'Khoá tài khoản'}
                                    </button>
                                </td>
                                <td>
                                    {open && (
                                        <Modal
                                            show={open}
                                            onClose={() => setOpen(false)}
                                            modalStyle={{ width: '60%' }}
                                            closeBtnStyle={{ display: 'none' }}
                                        >
                                            <div className={cx('modal_container')}>
                                                <h1 className={cx('modal-header')}>iCoaching</h1>
                                                <h2 className={cx('text_modal')}>
                                                    Bạn có đồng ý khoá tài khoản{' '}
                                                    <span style={{ color: '#DF1B1B' }}>
                                                        {data.find((item) => item.id === id).userName}
                                                    </span>
                                                </h2>
                                                <div className={cx('container_confirm')}>
                                                    <button
                                                        className={cx('button_active')}
                                                        onClick={() => LockedAdmin(id)}
                                                    >
                                                        <BsCheckLg className={cx('icon_modal')} />
                                                        Đồng ý
                                                    </button>
                                                    <button
                                                        className={cx('button_lock')}
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <HiOutlineXMark className={cx('icon_modal')} />
                                                        Huỷ bỏ
                                                    </button>
                                                </div>
                                            </div>
                                        </Modal>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <Pagination
                    className={cx('pagination-bar')}
                    currentPage={page}
                    totalCount={count}
                    pageSize={pageSize}
                    onPageChange={(page) => handlePageChanged(page)}
                />
            </div>
        </div>
    );
};

export default ListAdmin;

import { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachesView.module.scss';

import { BsCheckLg } from 'react-icons/bs';
import { BsXLg } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

const CoachesView = () => {
    const coaches = [
        {
            id: 1,
            username: 'user1',
            fullname: 'Le Minh Hoang Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 2,
            username: 'user2',
            fullname: 'Hoang Tran',
            gender: 'Other',
            age: 30,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 3,
            username: 'user3',
            fullname: 'Hoang Tran',
            gender: 'Female',
            age: 19,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: true,
        },
        {
            id: 4,
            username: 'user4',
            fullname: 'Hoang Tran',
            gender: 'Male',
            age: 50,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 5,
            username: 'user5',
            fullname: 'Huy Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 6,
            username: 'user6',
            fullname: 'Phongg Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 7,
            username: 'user7',
            fullname: 'Phu Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: true,
        },
        {
            id: 8,
            username: 'user8',
            fullname: 'Nguyen Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 9,
            username: 'user9',
            fullname: 'Khanh Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 10,
            username: 'user10',
            fullname: 'Minh Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 11,
            username: 'user11',
            fullname: 'Vinhh Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: true,
        },
        {
            id: 12,
            username: 'user12',
            fullname: 'Kha Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
        {
            id: 13,
            username: 'user13',
            fullname: 'Phuc Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            isLocked: false,
        },
    ];

    let pageSize = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const currentCoachesPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return coaches.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, coaches]);

    const [lockOpen, setLockOpen] = useState(false);
    const [coachUsername, setCoachUsername] = useState('');
    const handleLockOpen = (e) => {
        setLockOpen(true);
        setCoachUsername(e);
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
                        {currentCoachesPagination.map((coach) => (
                            <tr className="">
                                <td>{coach.username}</td>
                                <td>{coach.fullname}</td>
                                <td>{coach.gender}</td>
                                <td>{coach.age}</td>
                                <td>{coach.email}</td>
                                <td>{coach.phoneNumber}</td>
                                <td>
                                    <button
                                        className={cx(`${coach.isLocked === true ? 'btn-confirm' : 'btn-warn'}`)}
                                        onClick={() => handleLockOpen(coach.username)}
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
                totalCount={coaches.length}
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
                            <p>{`Bạn có đồng ý khoá tài khoản ${coachUsername}?`}</p>
                            <div className={cx('button')}>
                                <button className={cx('btn-confirm')}>
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

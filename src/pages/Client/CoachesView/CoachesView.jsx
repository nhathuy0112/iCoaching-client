import { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames/bind';
import Pagination from '~/components/Pagination';
import styles from './CoachesView.module.scss';

import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CoachesView = () => {
    const coaches = [
        {
            id: 1,
            fullname: 'Hoang Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 2,
            fullname: 'Hoang Tran',
            gender: 'Nam',
            age: 30,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 3,
            fullname: 'Hoang Tran',
            gender: 'Nam',
            age: 19,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 4,
            fullname: 'Hoang Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 5,
            fullname: 'Huy Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 6,
            fullname: 'Phongg Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 7,
            fullname: 'Phu Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 8,
            fullname: 'Nguyen Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 9,
            fullname: 'Khanh Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 10,
            fullname: 'Minh Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 11,
            fullname: 'Vinhh Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 12,
            fullname: 'Kha Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 13,
            fullname: 'Phuc Tran',
            gender: 'Nam',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
    ];
    console.log(window.innerWidth);
    //Pagtination
    const [pageSize, setPageSize] = useState(12);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1536) {
                setPageSize(10);
            } else {
                setPageSize(12);
            }
        }
        handleResize();
    }, [pageSize]);
    const [currentPage, setCurrentPage] = useState(1);

    const currentCoachesPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return coaches.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, coaches]);

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>Danh sách Huấn luyện viên</h4>
            <ul className={cx('coach-list')}>
                {currentCoachesPagination.map((coach) => (
                    <li className={cx('coach-item')} key={coach.id}>
                        <Link to="/" className={cx('card')}>
                            <div className={cx('avatar')}>
                                {coach.avatar ? (
                                    <img src={require('~/assets/images/coach-photo1.png')} alt="Coach" />
                                ) : (
                                    <div className={cx('default')}>
                                        <FaUserCircle className={cx('icon')} />
                                    </div>
                                )}
                            </div>
                            <div className={cx('fullname')}>
                                <label>Họ và tên</label>
                                <span>{coach.fullname}</span>
                            </div>
                            <div className={cx('gender')}>
                                <label>Giới tính</label>
                                <span>{coach.gender}</span>
                            </div>
                            <div className={cx('age')}>
                                <label>Tuổi</label>
                                <span>{coach.age}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <Pagination
                className={cx('pagination-bar')}
                currentPage={currentPage}
                totalCount={coaches.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default CoachesView;

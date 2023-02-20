import { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import Pagination from '~/components/Pagination';
import styles from './CoachesView.module.scss';

import UserCard from '~/components/UserCard';

import { ImFilter, ImSearch } from 'react-icons/im';

const cx = classNames.bind(styles);

const CoachesView = () => {
    const coaches = [
        {
            id: 1,
            fullname: 'Le Minh Hoang Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 2,
            fullname: 'Hoang Tran',
            gender: 'Other',
            age: 30,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 3,
            fullname: 'Hoang Tran',
            gender: 'Female',
            age: 19,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 4,
            fullname: 'Hoang Tran',
            gender: 'Male',
            age: 50,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 5,
            fullname: 'Huy Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 6,
            fullname: 'Phongg Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 7,
            fullname: 'Phu Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 8,
            fullname: 'Nguyen Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 9,
            fullname: 'Khanh Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 10,
            fullname: 'Minh Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 11,
            fullname: 'Vinhh Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 12,
            fullname: 'Kha Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
            avatar: '~/assets/images/coach-photo1.png',
        },
        {
            id: 13,
            fullname: 'Phuc Tran',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
    ];
    let pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const currentCoachesPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return coaches.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, coaches]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-action')}>
                <h4 className={cx('title')}>Danh sách Huấn luyện viên</h4>
                <div className={cx('action')}>
                    <div className={cx('filter')}>
                        <ImFilter className={cx('filter-icon')} />
                        <h4 className={cx('filter-title')}>Lọc</h4>
                        <form id={cx('filter-gender-form')}>
                            <select className={cx('filter-form-select')}>
                                <option value="">Giới tính</option>
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                                <option value="Other">Khác</option>
                            </select>
                        </form>
                        <form id={cx('filter-age-form')}>
                            <select className={cx('filter-form-select')}>
                                <option value="">Độ tuổi</option>
                                <option value="Male">18-25</option>
                                <option value="Female">25-30</option>
                                <option value="Other">30-35</option>
                                <option value="Other">35-40</option>
                            </select>
                        </form>
                    </div>
                    <div className={cx('search')}>
                        <form className={cx('search-form')}>
                            <ImSearch className={cx('search-icon')} />
                            <input type="text" placeholder="Tìm kiếm" className={cx('search-input')} />
                        </form>
                    </div>
                </div>
            </div>
            <div className={cx('coach-list')}>
                {currentCoachesPagination.map((coach) => (
                    <div className={cx('coach-item')} key={coach.id}>
                        <UserCard user={coach} role="coach" />
                    </div>
                ))}
            </div>
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

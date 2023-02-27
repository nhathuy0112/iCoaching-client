import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachList.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCoachesAsync } from '~/features/guestSlice';
import UserCard from '~/components/UserCard';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
const cx = classNames.bind(styles);

const Coaches = () => {
    const dispatch = useDispatch();
    // const { coaches } = useSelector((state) => state.guest);
    // useEffect(() => {
    //     dispatch(getAllCoachesAsync({ pageSize: 8 }));
    // }, [dispatch]);
    const coaches = [
        {
            id: 1,
            name: 'Hoang Tran',
            age: 32,
            gender: 'Male',
        },
        {
            id: 2,
            name: 'Hoang Nguyen',
            age: 24,
            gender: 'Female',
        },
        {
            id: 3,
            name: 'Hoang Le',
            age: 18,
            gender: 'Other',
        },
        {
            id: 4,
            name: 'Hoang Tran',
            age: 32,
            gender: 'Male',
        },
        {
            id: 5,
            name: 'Hoang Tran',
            age: 32,
            gender: 'Male',
        },
        {
            id: 6,
            name: 'Hoang Tran',
            age: 32,
            gender: 'Male',
        },
        {
            id: 7,
            name: 'Hoang Tran',
            age: 32,
            gender: 'Male',
        },
        {
            id: 8,
            name: 'Hoang Tran',
            age: 32,
            gender: 'Male',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <div className={cx('back')}>
                        <Link to={`/`} className={cx('back-link')}>
                            <IoIosArrowBack />
                            <span>Quay lại</span>
                        </Link>
                    </div>
                    <div className={cx('title')}>
                        <h1>Huấn luyện viên</h1>
                        <span>Đội ngũ huấn luyện viên chất lượng, tận tình sẵn sàng phục vụ mọi người</span>
                    </div>
                </div>
                <div className={cx('coach-list')}>
                    {coaches.map((coach) => (
                        <div className={cx('coach-item')} key={coach.id}>
                            <UserCard user={coach} role="coach" />
                        </div>
                    ))}
                </div>
                <button id={cx('view-all-btn')}>Xem thêm</button>
            </div>
        </div>
    );
};

export default Coaches;

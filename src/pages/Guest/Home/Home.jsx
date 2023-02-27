import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Pagination from '~/components/Pagination';

import { AiOutlineSchedule } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { BiTimeFive } from 'react-icons/bi';
import ServiceCard from '~/components/ServiceCard';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCoachesAsync } from '~/features/guestSlice';
import { useEffect, useMemo, useState } from 'react';
import UserCard from '~/components/UserCard';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Home = () => {
    const services = [
        {
            id: 1,
            icon: <BiTimeFive />,
            content: 'Bài tập khoa học',
        },
        {
            id: 2,
            icon: <BiTimeFive />,
            content: 'Huấn luyện trực tuyến',
            isMain: true,
        },
        {
            id: 3,
            icon: <BiTimeFive />,
            content: 'Giảm cân cấp tốc',
        },
        {
            id: 4,
            icon: <BiTimeFive />,
            content: 'Tư vấn dinh dưỡng',
        },
    ];

    const dispatch = useDispatch();
    const { coaches } = useSelector((state) => state.guest);

    // const coaches = [
    //     {
    //         id: 1,
    //         name: 'Hoang Tran',
    //         age: 32,
    //         gender: 'Male',
    //     },
    //     {
    //         id: 2,
    //         name: 'Hoang Nguyen',
    //         age: 24,
    //         gender: 'Female',
    //     },
    //     {
    //         id: 3,
    //         name: 'Hoang Le',
    //         age: 18,
    //         gender: 'Other',
    //     },
    //     {
    //         id: 4,
    //         name: 'Hoang Tran',
    //         age: 32,
    //         gender: 'Male',
    //     },
    //     {
    //         id: 5,
    //         name: 'Hoang Tran',
    //         age: 32,
    //         gender: 'Male',
    //     },
    //     {
    //         id: 6,
    //         name: 'Hoang Tran',
    //         age: 32,
    //         gender: 'Male',
    //     },
    //     {
    //         id: 7,
    //         name: 'Hoang Tran',
    //         age: 32,
    //         gender: 'Male',
    //     },
    //     {
    //         id: 8,
    //         name: 'Hoang Tran',
    //         age: 32,
    //         gender: 'Male',
    //     },
    //     {
    //         id: 9,
    //         name: 'Hoang Tran',
    //         age: 32,
    //         gender: 'Male',
    //     },
    //     {
    //         id: 10,
    //         name: 'Hoang Tran',
    //         age: 32,
    //         gender: 'Male',
    //     },
    // ];

    useEffect(() => {
        dispatch(getAllCoachesAsync({ pageSize: 8 }));
    }, [dispatch]);
    let pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const currentCoachesPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return coaches.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, coaches]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('banner-content')}>
                    <div className={cx('slogan-and-train')}>
                        <h1 className={cx('main-slogan')}>
                            <span style={{ color: 'var(--primary-color)' }}>Sức khỏe</span> <br /> là lựa chọn, không
                            phải điều bí ẩn của sự ngẫu nhiên
                        </h1>
                        <h5 className={cx('sub-slogan')}>
                            Sức khỏe không phải là thứ chúng ta có thể mua. Tuy nhiên, nó có thể là một tài khoản tiết
                            kiệm cực kỳ giá trị.
                        </h5>
                        <button className={cx('train-btn')}>tập luyện ngay</button>
                    </div>
                    <div className={cx('services')}>
                        <div className={cx('service-list')}>
                            <div className={cx('service-item')}>
                                <div className={cx('service-icon')}>
                                    <AiOutlineSchedule />
                                </div>
                                <div className={cx('service-content')}>
                                    <span className={cx('description')}>Thời gian biểu khoa học</span>
                                    <span className={cx('sub-description')}>Dinh dưỡng & luyện tập </span>
                                </div>
                            </div>
                            <li className={cx('service-item')}>
                                <div className={cx('service-icon')}>
                                    <CgGym />
                                </div>
                                <div className={cx('service-content')}>
                                    <span className={cx('description')}>Huấn luyện</span>
                                    <span className={cx('sub-description')}>Đăng ký trực tuyến</span>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>

                <div className={cx('service')}>
                    <div className={cx('title')}>
                        <h1>dịch vụ</h1>
                        <span>Chúng tôi sẵn lòng mang đến những dịch vụ tốt nhất</span>
                    </div>
                    <div className={cx('service-list')}>
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
                <div className={cx('coaches')}>
                    <div className={cx('title')}>
                        <h1>Huấn luyện viên</h1>
                        <span>Đội ngũ huấn luyện viên chất lượng, tận tình sẵn sàng phục vụ mọi người</span>
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
                    <Link to="/all-coaches" id={cx('view-all-btn')}>
                        Xem tất cả
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

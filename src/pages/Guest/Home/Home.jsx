import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { AiOutlineSchedule } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { GiWeightScale, GiWeightLiftingUp } from 'react-icons/gi';
import { MdOutlineNoFood } from 'react-icons/md';
import { RiBaseStationLine } from 'react-icons/ri';
import ServiceCard from '~/components/ServiceCard';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCoachesAsync } from '~/features/guestSlice';
import { useEffect } from 'react';
import UserCard from '~/components/UserCard';
import { Link } from 'react-router-dom';
import Spinner from '~/components/Spinner';
const cx = classNames.bind(styles);

const Home = () => {
    const services = [
        {
            id: 1,
            icon: <GiWeightLiftingUp />,
            content: 'Bài tập khoa học',
        },
        {
            id: 2,
            icon: <RiBaseStationLine />,
            content: 'Huấn luyện trực tuyến',
        },
        {
            id: 3,
            icon: <GiWeightScale />,
            content: 'Giảm cân cấp tốc',
        },
        {
            id: 4,
            icon: <MdOutlineNoFood />,
            content: 'Tư vấn dinh dưỡng',
        },
    ];

    const dispatch = useDispatch();
    const { coaches, loading } = useSelector((state) => state.guest);

    useEffect(() => {
        dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: 10 }));
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className={cx('coach-list')}>
                            {coaches.map((coach) => (
                                <div className={cx('coach-item')} key={coach.id}>
                                    <UserCard user={coach} role="coach" />
                                </div>
                            ))}
                        </div>
                    )}
                    <Link to="/all-coaches" id={cx('view-all-btn')}>
                        Xem tất cả
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
